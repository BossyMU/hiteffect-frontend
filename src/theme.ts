// Design tokens taken from the "Hit Effect — TCG Shop" Figma file.
export const color = {
  text: "#171a1f",
  textWarm: "#241f16",
  muted: "#686d75",
  kicker: "#f5f6fa",
  border: "#d9dee5",
  borderSoft: "#dfe2e6",
  borderHeader: "#d7dee7",
  surface: "#ffffff",
  pill: "#e7e9ec",
  accent: "#ff7a1a",
  onAccent: "#1a0f08",
  cyan: "#2eb6e0",
  success: "#1c8a4b",
  danger: "#c1362f",
  disabled: "#d8d0bd",
  badge: "#2a2416",
  overlay: "rgba(18, 19, 28, 0.62)",
} as const;

export const font = {
  sans: '"Inter", system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
  display: '"Cinzel", Georgia, serif',
} as const;

export const shadow = {
  header: "0px 6px 18px 0px rgba(51, 65, 85, 0.1)",
  sidebar: "0px 8px 24px 0px rgba(23, 26, 31, 0.08)",
  main: "0px 14px 34px 0px rgba(0, 0, 0, 0.22)",
  card: "0px 8px 24px 0px rgba(23, 26, 31, 0.1)",
} as const;

export const pageBackground =
  "linear-gradient(134.35deg, rgb(221, 248, 255) 12.95%, rgb(231, 242, 255) 37.41%, rgb(255, 244, 184) 61.87%, rgb(255, 217, 199) 84.89%)";
