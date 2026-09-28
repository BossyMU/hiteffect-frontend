import React, { createContext, useCallback, useContext, useMemo } from "react";
import { products as catalog, type Foil, type Product } from "../data/products";
import { usePersistentState } from "../lib/storage";

// Live inventory: the catalogue with stock levels adjusted by mock purchases.
type StockMap = Record<string, number>;

type ProductContextValue = {
  products: Product[];
  getProduct: (id?: string) => Product | undefined;
  getVariant: (id: string, foil: Foil) => Product["variants"][number] | undefined;
  takeStock: (lines: { id: string; foil: Foil; quantity: number }[]) => void;
};

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}

const key = (id: string, foil: Foil) => `${id}:${foil}`;

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [stock, setStock] = usePersistentState<StockMap>("he_stock", {});

  const products = useMemo(
    () =>
      catalog.map((p) => ({
        ...p,
        variants: p.variants.map((v) => ({
          ...v,
          stock: stock[key(p.id, v.foil)] ?? v.stock,
        })),
      })),
    [stock],
  );

  const getProduct = useCallback((id?: string) => products.find((p) => p.id === id), [products]);

  const getVariant = useCallback(
    (id: string, foil: Foil) => getProduct(id)?.variants.find((v) => v.foil === foil),
    [getProduct],
  );

  const takeStock = useCallback<ProductContextValue["takeStock"]>(
    (lines) =>
      setStock((prev) => {
        const next = { ...prev };
        for (const l of lines) {
          const current = getVariant(l.id, l.foil)?.stock ?? 0;
          next[key(l.id, l.foil)] = Math.max(0, current - l.quantity);
        }
        return next;
      }),
    [getVariant, setStock],
  );

  const value = useMemo(
    () => ({ products, getProduct, getVariant, takeStock }),
    [products, getProduct, getVariant, takeStock],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
