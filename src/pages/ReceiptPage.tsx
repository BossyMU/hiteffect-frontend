import styled from "@emotion/styled";
import { Navigate, useParams } from "react-router-dom";
import Logo from "../components/Logo";
import { BackLink } from "../components/PageNav";
import { Button } from "../components/ui/Button";
import ElementTile from "../components/ui/ElementTile";
import { paymentMethods, useOrders } from "../context/OrderContext";
import { formatDate, formatPrice } from "../lib/format";
import { color, font, shadow } from "../theme";
import { TopLogo } from "./ThankYouPage";

export default function ReceiptPage() {
  const { ref } = useParams();
  const order = useOrders().getOrder(ref);
  if (!order) return <Navigate to="/" replace />;

  const method = paymentMethods.find((m) => m.id === order.method)?.label;

  return (
    <Wrap>
      <TopLogo to="/" aria-label="Hit Effect home">
        <Logo width={220} height={105.3} />
      </TopLogo>
      <Card>
        <div className="head">
          <h1>Receipt</h1>
          <p>Thank you for shopping at Hit Effect.</p>
        </div>
        <div className="meta">
          <div>
            <span className="label">RECEIPT ID</span>
            <strong>{order.ref}</strong>
          </div>
          <div className="right">
            <span className="label">DATE</span>
            <span className="date">{formatDate(order.createdAt)}</span>
          </div>
        </div>
        <hr />
        <div className="lines">
          {order.lines.map((l) => (
            <div className="line" key={`${l.id}:${l.foil}`}>
              <ElementTile element={l.element} width={30} height={40} />
              <div className="info">
                <span className="name">
                  {l.name}
                  {l.foil !== "Non-Foil" && ` (${l.foil})`}
                </span>
                <span className="qty">
                  Qty {l.quantity} × {formatPrice(l.price)}
                </span>
              </div>
              <span className="price">{formatPrice(l.price * l.quantity)}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="totals">
          <div>
            <span>Subtotal</span>
            <span className="mono">{formatPrice(order.subtotal)}</span>
          </div>
          <div>
            <span>Shipping</span>
            <span className="mono" style={{ color: color.success }}>
              {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
            </span>
          </div>
          <div className="paid">
            <span>Total Paid</span>
            <span className="mono">{formatPrice(order.total)}</span>
          </div>
        </div>
        <hr />
        <div className="foot">
          <p>Paid via {method}</p>
          <p>Receipt sent to {order.email}</p>
        </div>
        {/* Mock: both use the browser print dialog, which can also save as PDF. */}
        <div className="actions no-print">
          <Button block onClick={() => window.print()}>
            Download PDF
          </Button>
          <Button block variant="secondary" onClick={() => window.print()}>
            Print Receipt
          </Button>
        </div>
      </Card>
      <div className="back no-print">
        <BackLink />
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 147.5px 16px 40px;
  .back {
    width: 520px;
    max-width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
  @media print {
    padding-top: 130px;
  }
`;

const Card = styled.section`
  box-sizing: border-box;
  width: 520px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 14px;
  box-shadow: ${shadow.sidebar};
  hr {
    width: 100%;
    height: 1px;
    margin: 0;
    border: 0;
    background: ${color.border};
  }
  .head {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 16px;
    h1 {
      font: 700 22px/normal ${font.display};
      color: ${color.text};
    }
    p {
      font: 400 12px/normal ${font.sans};
      color: ${color.muted};
    }
  }
  .meta {
    display: flex;
    justify-content: space-between;
    padding: 14px 0;
    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .right {
      align-items: flex-end;
    }
    .label {
      font: 400 9.5px/normal ${font.mono};
      letter-spacing: 1.5px;
      color: ${color.muted};
    }
    strong {
      font: 700 14px/normal ${font.mono};
      color: ${color.text};
    }
    .date {
      font: 500 13px/normal ${font.sans};
      color: ${color.text};
    }
  }
  .lines {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 0 8px;
  }
  .line {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .info {
    flex: 1 0 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .name {
    font: 400 12.5px/normal ${font.sans};
    color: ${color.text};
  }
  .qty {
    font: 400 10.5px/normal ${font.mono};
    color: ${color.muted};
  }
  .price {
    font: 500 12.5px/normal ${font.mono};
    color: ${color.text};
  }
  .totals {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 14px 0;
    div {
      display: flex;
      justify-content: space-between;
      font: 400 12.5px/normal ${font.sans};
      color: ${color.muted};
    }
    .mono {
      font-family: ${font.mono};
      color: ${color.text};
    }
    .paid {
      font-size: 14px;
      font-weight: 700;
      color: ${color.text};
    }
  }
  .foot {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 14px;
    font: 400 11.5px/normal ${font.sans};
    color: ${color.muted};
  }
  .actions {
    display: flex;
    gap: 10px;
    padding-top: 20px;
  }
  @media print {
    box-shadow: none;
  }
`;
