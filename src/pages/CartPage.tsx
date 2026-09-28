import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { MainPanel, PageTitle } from "../components/Layouts";
import { BackLink, Breadcrumbs } from "../components/PageNav";
import { Button, ButtonLink } from "../components/ui/Button";
import ElementTile from "../components/ui/ElementTile";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { color, font } from "../theme";

export default function CartPage() {
  const { lines, subtotal, decrement, removeFromCart } = useCart();

  return (
    <MainPanel>
      <BackLink />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <PageTitle>Cart</PageTitle>

      <Layout>
        <Lines>
          {lines.map((l) => (
            <Line key={`${l.id}:${l.foil}`}>
              <ElementTile element={l.product.element} width={48} height={64} />
              <div className="info">
                <Link to={`/product/${l.id}`}>{l.product.name}</Link>
                <span>
                  Qty {l.quantity}
                  {l.foil !== "Non-Foil" && ` · ${l.foil}`}
                </span>
              </div>
              <span className="price">{formatPrice(l.lineTotal)}</span>
              <button
                type="button"
                className="minus"
                aria-label={`Remove one ${l.product.name}`}
                onClick={() => decrement(l.id, l.foil)}
              >
                <span className="icon">
                  <img src="figma/icon-minus-sm.svg" alt="" width={15.8} height={13} />
                </span>
              </button>
              <button
                type="button"
                className="trash"
                aria-label={`Remove ${l.product.name} from cart`}
                onClick={() => removeFromCart(l.id, l.foil)}
              >
                <img src="figma/icon-trash.svg" alt="" width={15} height={15} />
              </button>
            </Line>
          ))}
        </Lines>

        <Summary>
          <div className="row">
            <span>Subtotal</span>
            <span className="mono">{formatPrice(subtotal)}</span>
          </div>
          <hr />
          <div className="row total">
            <span>Total</span>
            <span className="mono">{formatPrice(subtotal)}</span>
          </div>
          {lines.length > 0 ? (
            <ButtonLink block to="/checkout">
              Proceed to Checkout
            </ButtonLink>
          ) : (
            <Button block disabled>
              Proceed to Checkout
            </Button>
          )}
        </Summary>
      </Layout>
    </MainPanel>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  width: 100%;
`;

const Lines = styled.div`
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 12px;
  .info {
    flex: 1 0 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    white-space: nowrap;
    a {
      font: 400 13px/normal ${font.sans};
      color: ${color.text};
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      font: 400 11.5px/normal ${font.mono};
      color: ${color.muted};
    }
  }
  .price {
    font: 700 14px/normal ${font.mono};
    color: ${color.text};
  }
  button {
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
    display: flex;
  }
  .minus {
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border: 1px solid ${color.border};
    border-radius: 6px;
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
`;

const Summary = styled.div`
  box-sizing: border-box;
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 12px;
  .row {
    display: flex;
    justify-content: space-between;
    font: 400 13px/normal ${font.sans};
    color: ${color.muted};
  }
  .row .mono {
    font-family: ${font.mono};
    color: ${color.text};
  }
  .total {
    font-size: 15px;
    font-weight: 700;
    color: ${color.text};
  }
  hr {
    width: 100%;
    height: 1px;
    margin: 0;
    border: 0;
    background: ${color.border};
  }
`;
