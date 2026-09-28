import styled from "@emotion/styled";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { MainPanel } from "../components/Layouts";
import { BackLink, Breadcrumbs, type Crumb } from "../components/PageNav";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { Button } from "../components/ui/Button";
import ElementTile from "../components/ui/ElementTile";
import { Label } from "../components/ui/Field";
import RarityBadge from "../components/ui/RarityBadge";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { findGame, findSet, findType, rarityName, type Foil } from "../data/products";
import { formatPrice } from "../lib/format";
import { color, font } from "../theme";

const foilDot: Record<Foil, string> = {
  "Non-Foil": "figma/dot-nonfoil.svg",
  "Rainbow Foil": "figma/dot-rainbow.svg",
  "Cold Foil": "figma/dot-cold.svg",
};

// Keyed by id so foil/quantity reset when moving between products.
export default function ProductPage() {
  const { id } = useParams();
  return <ProductDetail key={id} id={id} />;
}

function ProductDetail({ id }: { id?: string }) {
  const { products, getProduct } = useProducts();
  const { lines, addToCart } = useCart();
  const product = getProduct(id);
  const [foil, setFoil] = useState<Foil | null>(null);
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/" replace />;

  const variant = product.variants.find((v) => v.foil === foil) ?? product.variants[0];
  const inCart = lines.find((l) => l.id === product.id && l.foil === variant.foil)?.quantity ?? 0;
  const available = Math.max(0, variant.stock - inCart);
  const soldOut = variant.stock === 0;

  const game = findGame(product.game);
  const set = findSet(product.set);
  const type = findType(product.type);

  const crumbs: Crumb[] = [{ label: "Home", to: "/" }];
  if (set && game) {
    crumbs.push(
      { label: game.name, to: `/game/${game.slug}` },
      { label: set.name, to: `/game/${game.slug}/set/${set.slug}` },
    );
  } else if (type) {
    crumbs.push({ label: type.name, to: `/shop/${type.slug}` });
  }
  crumbs.push({ label: product.name });

  const related = products
    .filter((p) => p.id !== product.id && (set ? p.set === product.set : p.type === product.type))
    .slice(0, 7);

  const description =
    product.description ?? `Part of the ${set?.name} set. Condition is graded to our standard inspection criteria.`;

  function selectFoil(f: Foil) {
    setFoil(f);
    setQty(1);
  }

  function handleAdd() {
    if (addToCart(product!.id, variant.foil, qty) > 0) setQty(1);
  }

  return (
    <MainPanel gap={44}>
      <BackLink />
      <Breadcrumbs items={crumbs} boldLast />

      <Detail>
        <ElementTile element={product.element} width={260} height={347} />
        <Info>
          <h1>{product.name}</h1>
          {product.rarity && (
            <div className="meta">
              <RarityBadge rarity={product.rarity} />
              <span>
                {rarityName[product.rarity]} • {product.element}
              </span>
            </div>
          )}
          <p className="price">{formatPrice(variant.price)}</p>
          <p className="stock" style={{ color: soldOut ? color.danger : color.success }}>
            {soldOut ? "Sold out" : `${variant.stock} in stock`}
          </p>

          {product.variants.length > 1 && (
            <Foils>
              <Label>FOIL</Label>
              <div className="chips" role="radiogroup" aria-label="Foil">
                {product.variants.map((v) => {
                  const selected = v.foil === variant.foil;
                  const out = v.stock === 0;
                  return (
                    <Chip
                      key={v.foil}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      data-selected={selected}
                      data-out={out}
                      onClick={() => selectFoil(v.foil)}
                    >
                      <img src={foilDot[v.foil]} alt="" width={9} height={9} />
                      {out ? `${v.foil} — Out of Stock` : v.foil}
                    </Chip>
                  );
                })}
              </div>
            </Foils>
          )}

          <Actions>
            <Stepper aria-label="Quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={qty <= 1 || soldOut}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <span className="icon">
                  <img src="figma/icon-minus-sm.svg" alt="" width={15.8} height={13} />
                </span>
              </button>
              <span className="count">{soldOut ? 0 : qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={qty >= available || soldOut}
                onClick={() => setQty((q) => Math.min(available, q + 1))}
              >
                <span className="icon">
                  <img src="figma/icon-plus-sm.svg" alt="" width={15.8} height={15.8} />
                </span>
              </button>
            </Stepper>
            <Button disabled={soldOut || available === 0} onClick={handleAdd}>
              {soldOut ? "Sold Out" : "Add to Cart"}
            </Button>
          </Actions>

          <p className="desc">{description}</p>
        </Info>
      </Detail>

      {related.length > 0 && (
        <Related>
          <SectionHeading kicker="RELATED" title={set ? "More From This Set" : "More Like This"} />
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Related>
      )}
    </MainPanel>
  );
}

const Detail = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 36px;
  width: 100%;
`;

const Info = styled.div`
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  h1 {
    font: 700 26px/normal ${font.display};
    color: ${color.text};
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 10px;
    font: 400 12.5px/normal ${font.sans};
    color: ${color.muted};
  }
  .price {
    font: 700 26px/normal ${font.mono};
    color: ${color.text};
  }
  .stock {
    font: 400 12.5px/normal ${font.mono};
  }
  .desc {
    max-width: 420px;
    font: 400 12.5px/normal ${font.sans};
    color: ${color.muted};
  }
`;

const Foils = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const Chip = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 20px;
  border: 1px solid ${color.borderSoft};
  background: transparent;
  font: 400 11.5px/normal ${font.sans};
  color: ${color.text};
  cursor: pointer;
  &[data-out="true"] {
    color: ${color.muted};
  }
  &[data-selected="true"] {
    background: #fff;
    border: 1.5px solid ${color.cyan};
    padding: 6.5px 9.5px;
    font-weight: 600;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Stepper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${color.borderSoft};
  border-radius: 8px;
  overflow: hidden;
  button {
    display: flex;
    padding: 8px;
    border: 0;
    background: none;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .icon {
    position: relative;
    width: 13px;
    height: 13px;
    img {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .count {
    padding: 0 10px;
    font: 400 14px/normal ${font.mono};
    color: ${color.text};
    min-width: 9px;
    text-align: center;
  }
`;

const Related = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }
`;
