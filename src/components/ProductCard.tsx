import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";
import { formatPrice } from "../lib/format";
import { color, font } from "../theme";
import { Button } from "./ui/Button";
import ElementTile from "./ui/ElementTile";
import RarityBadge from "./ui/RarityBadge";

type Props = { product: Product };

/** Figma "Product Card" — 152×310 on every screen. */
export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const v = product.variants[0];
  const soldOut = v.stock === 0;

  return (
    <Card>
      <Body to={`/product/${product.id}`}>
        <Media>
          <ElementTile element={product.element} width={132} height={176} />
          {product.rarity && <Rarity rarity={product.rarity} />}
          {v.foil !== "Non-Foil" && <FoilTag>{v.foil}</FoilTag>}
          {soldOut && (
            <SoldOutOverlay>
              <span>SOLD OUT</span>
            </SoldOutOverlay>
          )}
        </Media>
        <Name>{product.name}</Name>
        <PriceRow>
          <Price>{formatPrice(v.price)}</Price>
          <Stock style={{ color: soldOut ? color.danger : color.success }}>
            {soldOut ? "Sold Out" : `Stock: ${v.stock}`}
          </Stock>
        </PriceRow>
      </Body>
      <Button block disabled={soldOut} onClick={() => addToCart(product.id, v.foil)}>
        {soldOut ? "Sold Out" : "Add to Cart"}
      </Button>
    </Card>
  );
}

const Card = styled.article`
  box-sizing: border-box;
  width: 152px;
  height: 310px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 12px;
  overflow: hidden;
`;

const Body = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: inherit;
  text-decoration: none;
`;

const Media = styled.div`
  position: relative;
  width: 132px;
  height: 176px;
  flex-shrink: 0;
`;

const Rarity = styled(RarityBadge)`
  position: absolute;
  left: 106px;
  top: 6px;
`;

const FoilTag = styled.span`
  position: absolute;
  left: 6px;
  top: 6px;
  padding: 2px 6px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.55);
  font: 400 9px/normal ${font.mono};
  color: ${color.cyan};
  white-space: nowrap;
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 132px;
  height: 176px;
  border-radius: 10px;
  background: ${color.overlay};
  span {
    position: absolute;
    left: 66px;
    top: 80px;
    width: 80px;
    transform: translateX(-50%);
    text-align: center;
    font: 700 11px/normal ${font.display};
    color: ${color.danger};
  }
`;

const Name = styled.p`
  margin: 0;
  height: 30px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font: 400 12.5px/normal ${font.sans};
  color: ${color.text};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
`;

const Price = styled.span`
  font: 700 15px/normal ${font.mono};
  color: ${color.text};
`;

const Stock = styled.span`
  font: 400 11px/normal ${font.mono};
`;
