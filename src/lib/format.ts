export const formatPrice = (n: number) => `$${n}`;

export const itemCount = (n: number) => `${n} ${n === 1 ? "item" : "items"}`;

export function makeOrderRef(date = new Date()) {
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .toUpperCase()
    .padStart(6, "0");
  return `HE-${ymd}-${suffix}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
