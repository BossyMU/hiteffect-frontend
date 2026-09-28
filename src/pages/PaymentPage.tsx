import styled from "@emotion/styled";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import ElementTile from "../components/ui/ElementTile";
import { Input, Label } from "../components/ui/Field";
import { useCart } from "../context/CartContext";
import { paymentMethods, useOrders, type PaymentMethod } from "../context/OrderContext";
import { formatPrice } from "../lib/format";
import { color, font, shadow } from "../theme";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PaymentPage() {
  const { lines, subtotal } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [paying, setPaying] = useState(false);

  // Nothing to pay for (and not mid-payment, when the cart is being emptied).
  if (lines.length === 0 && !paying) return <Navigate to="/cart" replace />;

  const emailError = !EMAIL_RE.test(email.trim());

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (emailError || paying) return;
    setPaying(true);
    const order = await placeOrder(email.trim(), method);
    navigate(`/order/${order.ref}`, { replace: true });
  }

  return (
    <Screen>
      <Card onSubmit={pay} noValidate>
        <Steps aria-label="Checkout progress">
          <Link to="/cart" className="step done">
            <b>1</b>Cart
          </Link>
          <i />
          <span className="step current" aria-current="step">
            <b>2</b>Payment
          </span>
          <i />
          <span className="step">
            <b>3</b>Confirmation
          </span>
        </Steps>

        <h1>Payment</h1>

        <Summary>
          <h2>Order Summary</h2>
          {lines.map((l) => (
            <div className="line" key={`${l.id}:${l.foil}`}>
              <ElementTile element={l.product.element} width={32} height={43} />
              <div className="info">
                <span className="name">{l.product.name}</span>
                <span className="qty">
                  Qty {l.quantity}
                  {l.foil !== "Non-Foil" && ` · ${l.foil}`}
                </span>
              </div>
              <span className="price">{formatPrice(l.lineTotal)}</span>
            </div>
          ))}
          <hr />
          <div className="total">
            <span>Total</span>
            <span className="mono">{formatPrice(subtotal)}</span>
          </div>
        </Summary>

        <Group role="radiogroup" aria-label="Payment method">
          <Label>PAYMENT METHOD</Label>
          {paymentMethods.map((m) => (
            <Method key={m.id} data-selected={method === m.id}>
              <input
                type="radio"
                name="method"
                value={m.id}
                checked={method === m.id}
                onChange={() => setMethod(m.id)}
              />
              <img
                src={method === m.id ? "figma/radio-on.svg" : "figma/radio-off.svg"}
                alt=""
                width={16}
                height={16}
              />
              <span className="text">
                <strong>{m.label}</strong>
                <span>{m.hint}</span>
              </span>
            </Method>
          ))}
        </Group>

        <Group style={{ gap: 6 }}>
          <Label htmlFor="receipt-email">EMAIL FOR RECEIPT</Label>
          <Input
            id="receipt-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && emailError}
          />
        </Group>

        <Button block type="submit" disabled={paying}>
          Pay {formatPrice(subtotal)}
        </Button>

        <p className="secure">🔒 Your payment information is encrypted and processed securely.</p>
      </Card>
    </Screen>
  );
}

export const Screen = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
`;

const Card = styled.form`
  box-sizing: border-box;
  width: 700px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
  padding: 36px 30px 60px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 16px;
  box-shadow: ${shadow.card};
  h1 {
    font: 700 26px/normal ${font.display};
    color: ${color.text};
  }
  .secure {
    width: 100%;
    text-align: center;
    font: 400 11px/normal ${font.sans};
    color: ${color.muted};
  }
`;

const Steps = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  i {
    width: 20px;
    height: 1px;
    background: ${color.borderSoft};
  }
  .step {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 20px;
    border: 1px solid ${color.borderSoft};
    font: 400 11.5px/normal ${font.sans};
    color: ${color.muted};
    text-decoration: none;
    white-space: nowrap;
  }
  .step b {
    font: 700 10.5px/normal ${font.mono};
  }
  .done {
    background: ${color.pill};
    color: ${color.text};
  }
  .current {
    background: ${color.accent};
    border-color: ${color.accent};
    color: ${color.onAccent};
    font-weight: 600;
  }
`;

const Summary = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 12px;
  box-shadow: ${shadow.sidebar};
  h2 {
    font: 700 15px/normal ${font.display};
    color: ${color.text};
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
  hr {
    width: 100%;
    height: 1px;
    margin: 0;
    border: 0;
    background: ${color.border};
  }
  .total {
    display: flex;
    justify-content: space-between;
    font: 700 14px/normal ${font.sans};
    color: ${color.text};
  }
  .mono {
    font-family: ${font.mono};
  }
`;

const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Method = styled.label`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 10px;
  cursor: pointer;
  &[data-selected="true"] {
    border: 1.5px solid ${color.cyan};
    padding: 13.5px;
  }
  &:focus-within {
    outline: 2px solid ${color.cyan};
    outline-offset: 2px;
  }
  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .text {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  strong {
    font: 600 13px/normal ${font.sans};
    color: ${color.text};
  }
  .text span {
    font: 400 11px/normal ${font.sans};
    color: ${color.muted};
  }
`;
