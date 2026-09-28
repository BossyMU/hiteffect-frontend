import React, { createContext, useCallback, useContext, useMemo } from "react";
import type { Element, Foil } from "../data/products";
import { makeOrderRef } from "../lib/format";
import { usePersistentState } from "../lib/storage";
import { useCart } from "./CartContext";
import { useProducts } from "./ProductContext";

export type PaymentMethod = "card" | "paypal" | "bank";

export const paymentMethods: { id: PaymentMethod; label: string; hint: string }[] = [
  { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, Amex" },
  { id: "paypal", label: "PayPal", hint: "Pay via your PayPal balance or card" },
  { id: "bank", label: "Bank Transfer", hint: "Direct transfer, 1-2 business days" },
];

export type Order = {
  ref: string;
  createdAt: string;
  email: string;
  method: PaymentMethod;
  lines: { id: string; name: string; element: Element; foil: Foil; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
};

type OrderContextValue = {
  getOrder: (ref?: string) => Order | undefined;
  placeOrder: (email: string, method: PaymentMethod) => Promise<Order>;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { lines, subtotal, clearCart } = useCart();
  const { takeStock } = useProducts();
  const [orders, setOrders] = usePersistentState<Order[]>("he_orders", []);

  const getOrder = useCallback((ref?: string) => orders.find((o) => o.ref === ref), [orders]);

  // Mock payment: wait a moment, then record the order, take stock and empty the cart.
  const placeOrder = useCallback<OrderContextValue["placeOrder"]>(
    async (email, method) => {
      await new Promise((r) => setTimeout(r, 900));
      const order: Order = {
        ref: makeOrderRef(),
        createdAt: new Date().toISOString(),
        email,
        method,
        lines: lines.map((l) => ({
          id: l.id,
          name: l.product.name,
          element: l.product.element,
          foil: l.foil,
          quantity: l.quantity,
          price: l.price,
        })),
        subtotal,
        shipping: 0,
        total: subtotal,
      };
      setOrders((prev) => [order, ...prev]);
      takeStock(lines);
      clearCart();
      return order;
    },
    [lines, subtotal, clearCart, takeStock, setOrders],
  );

  const value = useMemo(() => ({ getOrder, placeOrder }), [getOrder, placeOrder]);
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
