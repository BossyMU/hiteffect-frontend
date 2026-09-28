import styled from "@emotion/styled";
import type { Element } from "../../data/products";

const src: Record<Element, string> = {
  Fire: "figma/fire.svg",
  Ice: "figma/ice-screen.svg",
  Storm: "figma/storm.svg",
  Shadow: "figma/shadow.svg",
  Arcane: "figma/arcane.svg",
  Wild: "figma/wild.svg",
};

type Props = { element: Element; width: number; height: number; className?: string };

/** Figma "ElementTile": a card-shaped gradient tile with the element glyph. */
export default function ElementTile({ element, width, height, className }: Props) {
  return (
    <Tile className={className} style={{ width, height }}>
      <img src={src[element]} alt="" />
    </Tile>
  );
}

const Tile = styled.div`
  position: relative;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
