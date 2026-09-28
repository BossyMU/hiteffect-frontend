import styled from "@emotion/styled";
import { rarityName, type Rarity } from "../../data/products";
import { color, font } from "../../theme";

// Rare uses the cyan the storefront screens use (the component page shows #7dd3c0).
const tone: Record<Rarity, string> = {
  C: "#9296ab",
  R: color.cyan,
  M: "#b39ddb",
  L: "#f4c542",
  F: "#ff6b35",
  T: "#6b7280",
  B: "#a9865a",
};

export default function RarityBadge({ rarity, className }: { rarity: Rarity; className?: string }) {
  return (
    <Badge className={className} style={{ borderColor: tone[rarity], color: tone[rarity] }} title={rarityName[rarity]}>
      {rarity}
    </Badge>
  );
}

const Badge = styled.span`
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border: 1px solid;
  background: ${color.badge};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font: 700 11px/1 ${font.mono};
  flex-shrink: 0;
`;
