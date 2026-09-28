import React, { createContext, useCallback, useContext, useMemo } from "react";
import type { Foil, Product } from "../data/products";
import { usePersistentState } from "../lib/storage";
import { useProducts } from "./ProductContext";

type CartItem = { id: string; foil: Foil; quantity: number };

export type CartLine = CartItem & { product: Product; price: number; lineTotal: number };

type CartContextValue = {
  lines: CartLine[];
  totalItems: number;
  subtotal: number;
  /** Returns how many units were actually added (limited by stock). */
  addToCart: (id: string, foil?: Foil, qty?: number) => number;
  decrement: (id: string, foil: Foil) => void;
  removeFromCart: (id: string, foil: Foil) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

const same = (a: CartItem, id: string, foil: Foil) => a.id === id && a.foil === foil;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { getProduct, getVariant } = useProducts();
  const [items, setItems] = usePersistentState<CartItem[]>("he_cart", []);

  const lines = useMemo(
    () =>
      items.flatMap((it) => {
        const product = getProduct(it.id);
        const variant = getVariant(it.id, it.foil);
        if (!product || !variant) return [];
        return [{ ...it, product, price: variant.price, lineTotal: variant.price * it.quantity }];
      }),
    [items, getProduct, getVariant],
  );

  const addToCart = useCallback<CartContextValue["addToCart"]>(
    (id, foil, qty = 1) => {
      const product = getProduct(id);
      const variant = foil ? getVariant(id, foil) : product?.variants[0];
      if (!product || !variant) return 0;
      const inCart = items.find((i) => same(i, id, variant.foil))?.quantity ?? 0;
      const added = Math.max(0, Math.min(qty, variant.stock - inCart));
      if (added === 0) return 0;
      setItems((prev) =>
        prev.some((i) => same(i, id, variant.foil))
          ? prev.map((i) => (same(i, id, variant.foil) ? { ...i, quantity: i.quantity + added } : i))
          : [...prev, { id, foil: variant.foil, quantity: added }],
      );
      return added;
    },
    [items, getProduct, getVariant, setItems],
  );

  const decrement = useCallback(
    (id: string, foil: Foil) =>
      setItems((prev) =>
        prev.map((i) => (same(i, id, foil) ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0),
      ),
    [setItems],
  );

  const removeFromCart = useCallback(
    (id: string, foil: Foil) => setItems((prev) => prev.filter((i) => !same(i, id, foil))),
    [setItems],
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const value = useMemo(
    () => ({
      lines,
      totalItems: lines.reduce((s, l) => s + l.quantity, 0),
      subtotal: lines.reduce((s, l) => s + l.lineTotal, 0),
      addToCart,
      decrement,
      removeFromCart,
      clearCart,
    }),
    [lines, addToCart, decrement, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
