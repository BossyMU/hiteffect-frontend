import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { MainPanel } from "../components/Layouts";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { ButtonLink } from "../components/ui/Button";
import ElementTile from "../components/ui/ElementTile";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { homeSections, type Product } from "../data/products";
import { formatPrice } from "../lib/format";
import { color, font } from "../theme";

export default function Home() {
  const { getProduct } = useProducts();
  const pick = (ids: string[]) => ids.map((id) => getProduct(id)).filter((p): p is Product => !!p);

  return (
    <MainPanel gap={44}>
      <Hero>
        <HeroCopy>
          <p className="kicker">HIT EFFECT SELECT</p>
          <h1>Mastery Pack: Warrior</h1>
          <p className="sub">Now taking preorders — releases August 7</p>
          <ButtonLink variant="light" to={`/product/${homeSections.hero}`}>
            Preorder Now
          </ButtonLink>
        </HeroCopy>
        <HeroTile element="Fire" width={150} height={200} />
      </Hero>

      <Section>
        <SectionHeading kicker="NEW" title="New Arrivals" />
        <Grid>
          {pick(homeSections.newArrivals).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionHeading kicker="SALE" title="Online-Exclusive Clearance" />
        <Grid>
          {pick(homeSections.clearance).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionHeading
          kicker="TOP 5"
          title="Best Sellers"
          action={<SeeAll to="/game/flesh-and-blood">See All →</SeeAll>}
        />
        <Ranked>
          {pick(homeSections.bestSellers).map((p, i) => (
            <BestSellerRow key={p.id} product={p} rank={i + 1} />
          ))}
        </Ranked>
      </Section>
    </MainPanel>
  );
}

function BestSellerRow({ product, rank }: { product: Product; rank: number }) {
  const { addToCart } = useCart();
  const v = product.variants[0];
  const soldOut = v.stock === 0;
  return (
    <Row>
      <span className="rank" style={{ color: rank === 1 ? color.accent : color.muted }}>
        {String(rank).padStart(2, "0")}
      </span>
      <ElementTile element={product.element} width={40} height={53} />
      <Link className="name" to={`/product/${product.id}`}>
        {product.name}
      </Link>
      <span className="price">{formatPrice(v.price)}</span>
      {soldOut ? (
        <SmallButton disabled data-variant="soldout">
          Sold Out
        </SmallButton>
      ) : (
        <SmallButton onClick={() => addToCart(product.id, v.foil)}>Add</SmallButton>
      )}
    </Row>
  );
}

const Hero = styled.section`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 260px;
  border: 1px solid ${color.border};
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(to right, #171a1f, #5a2a1a 55%, #ff7a1a);
`;

const HeroCopy = styled.div`
  position: absolute;
  left: 39px;
  top: 35px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  .kicker {
    font: 400 11px/normal ${font.mono};
    letter-spacing: 3px;
    color: ${color.kicker};
  }
  h1 {
    font: 700 34px/normal ${font.display};
    color: #fff;
  }
  .sub {
    font: 400 14px/normal ${font.sans};
    color: #f3f5f7;
  }
`;

// Tilted -6° so its bounding box matches the 170×214.6 frame in Figma.
const HeroTile = styled(ElementTile)`
  position: absolute;
  left: 965px;
  top: 20.6px;
  transform: rotate(-6deg);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  width: 100%;
`;

const SeeAll = styled(Link)`
  font: 400 12.5px/normal ${font.sans};
  color: ${color.muted};
  text-decoration: none;
  white-space: nowrap;
`;

const Ranked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 16px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 10px;
  .rank {
    font: 400 20px/normal ${font.display};
  }
  .name {
    flex: 1 0 0;
    min-width: 0;
    font: 400 13px/normal ${font.sans};
    color: ${color.text};
    text-decoration: none;
  }
  .price {
    font: 700 13px/normal ${font.mono};
    color: ${color.text};
  }
`;

const SmallButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: ${color.accent};
  font: 600 11.5px/normal ${font.sans};
  color: ${color.onAccent};
  cursor: pointer;
  &[data-variant="soldout"] {
    background: transparent;
    border-color: ${color.borderSoft};
    color: ${color.muted};
    cursor: not-allowed;
  }
`;
