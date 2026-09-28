/** Figma "Logo/Wordmark". */
export default function Logo({ width, height }: { width: number; height: number }) {
  return (
    <img
      src="figma/logo.png"
      alt="Hit Effect — Boardgame & TCG"
      width={width}
      height={height}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}
