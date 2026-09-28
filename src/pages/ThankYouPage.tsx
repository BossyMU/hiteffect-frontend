import styled from "@emotion/styled";
import { Link, Navigate, useParams } from "react-router-dom";
import Logo from "../components/Logo";
import { ButtonLink } from "../components/ui/Button";
import { useOrders } from "../context/OrderContext";
import { color, font, shadow } from "../theme";
import { Screen } from "./PaymentPage";

export default function ThankYouPage() {
  const { ref } = useParams();
  const order = useOrders().getOrder(ref);
  if (!order) return <Navigate to="/" replace />;

  return (
    // Symmetric padding keeps the card centred (as in Figma) while clearing the logo.
    <Screen style={{ padding: "130px 16px" }}>
      <TopLogo to="/" aria-label="Hit Effect home">
        <Logo width={220} height={105.3} />
      </TopLogo>
      <Card>
        <div className="check" aria-hidden>
          <img src="figma/check-circle.svg" alt="" width={64} height={64} />
          <span>✓</span>
        </div>
        <h1>Thank you for your order!</h1>
        <p className="lead">Your order has been confirmed and is being prepared.</p>
        <div className="ref">
          <span>ORDER REF</span>
          <strong>{order.ref}</strong>
        </div>
        <p className="note">A confirmation email with your receipt has been sent to {order.email}</p>
        <div className="actions">
          <ButtonLink to={`/order/${order.ref}/receipt`}>View Receipt</ButtonLink>
          <ButtonLink variant="secondary" to="/">
            Continue Shopping
          </ButtonLink>
        </div>
      </Card>
    </Screen>
  );
}

export const TopLogo = styled(Link)`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Card = styled.section`
  box-sizing: border-box;
  width: 620px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 80px 30px 100px;
  text-align: center;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 16px;
  box-shadow: ${shadow.card};
  .check {
    position: relative;
    width: 64px;
    height: 64px;
    img {
      display: block;
    }
    span {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font: 700 30px/normal ${font.sans};
      color: ${color.onAccent};
    }
  }
  h1 {
    font: 700 28px/normal ${font.display};
    color: ${color.text};
  }
  .lead {
    font: 400 14px/normal ${font.sans};
    color: ${color.muted};
  }
  .ref {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid ${color.border};
    border-radius: 8px;
    span {
      font: 400 10px/normal ${font.mono};
      letter-spacing: 1.5px;
      color: ${color.muted};
    }
    strong {
      font: 700 13px/normal ${font.mono};
      color: ${color.text};
    }
  }
  .note {
    font: 400 12px/normal ${font.sans};
    color: ${color.muted};
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    padding-top: 10px;
  }
`;
