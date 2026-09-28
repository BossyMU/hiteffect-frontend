import styled from "@emotion/styled";
import { useState } from "react";
import { MainPanel } from "../components/Layouts";
import { BackLink, Breadcrumbs } from "../components/PageNav";
import { Button } from "../components/ui/Button";
import { Input, TextArea } from "../components/ui/Field";
import { storeInfo } from "../data/products";
import { usePersistentState } from "../lib/storage";
import { color, font } from "../theme";

type Message = { name: string; email: string; order: string; message: string };
const empty: Message = { name: "", email: "", order: "", message: "" };

function validate(m: Message) {
  const errors: Partial<Record<keyof Message, boolean>> = {};
  if (!m.name.trim()) errors.name = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) errors.email = true;
  if (!m.message.trim()) errors.message = true;
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<Message>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [, setInbox] = usePersistentState<(Message & { at: string })[]>("he_messages", []);

  const errors = submitted ? validate(form) : {};
  const set = (k: keyof Message) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(validate(form)).length > 0) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700)); // mock network
    setInbox((prev) => [{ ...form, at: new Date().toISOString() }, ...prev]);
    setForm(empty);
    setSubmitted(false);
    setSending(false);
  }

  return (
    <MainPanel>
      <BackLink />
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact Us" }]} />
      <Intro>
        <h1>Contact Us</h1>
        <p>
          Questions about an order, a card's condition, or a preorder? Send us a message and we'll get back to you
          within one business day.
        </p>
      </Intro>

      <Columns>
        <Form onSubmit={send} noValidate>
          <div className="row">
            <div className="field">
              <Input
                placeholder="Your name"
                aria-label="Your name"
                value={form.name}
                onChange={set("name")}
                aria-invalid={!!errors.name}
              />
            </div>
            <div className="field">
              <Input
                type="email"
                placeholder="Your email"
                aria-label="Your email"
                value={form.email}
                onChange={set("email")}
                aria-invalid={!!errors.email}
              />
            </div>
          </div>
          <Input
            placeholder="Order number (optional)"
            aria-label="Order number (optional)"
            value={form.order}
            onChange={set("order")}
          />
          <TextArea
            placeholder="How can we help?"
            aria-label="Message"
            value={form.message}
            onChange={set("message")}
            aria-invalid={!!errors.message}
          />
          <SendButton type="submit" disabled={sending}>
            Send Message
          </SendButton>
        </Form>

        <Info>
          <h2>Store Info</h2>
          <div>
            <span>EMAIL</span>
            <a href={`mailto:${storeInfo.email}`}>{storeInfo.email}</a>
          </div>
          <div>
            <span>PHONE</span>
            <p>{storeInfo.phone}</p>
          </div>
          <div>
            <span>ADDRESS</span>
            <p>{storeInfo.address}</p>
          </div>
          <div>
            <span>HOURS</span>
            <p>{storeInfo.hours}</p>
          </div>
          <p className="status">
            <img src="figma/dot-green.svg" alt="" width={7} height={7} />
            Replies within 1 business day
          </p>
        </Info>
      </Columns>
    </MainPanel>
  );
}

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  h1 {
    font: 700 26px/normal ${font.display};
    color: ${color.text};
  }
  p {
    font: 400 13px/normal ${font.sans};
    color: ${color.muted};
  }
`;

const Columns = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  width: 100%;
`;

const Form = styled.form`
  box-sizing: border-box;
  width: 560px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 24px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 12px;
  .row {
    display: flex;
    gap: 14px;
    width: 100%;
  }
  .field {
    flex: 1 0 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

// This screen's button uses #171a1f text rather than the usual #1a0f08.
const SendButton = styled(Button)`
  color: ${color.text};
`;

const Info = styled.aside`
  box-sizing: border-box;
  width: 360px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 12px;
  h2 {
    font: 700 16px/normal ${font.display};
    color: ${color.text};
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  span {
    font: 400 10.5px/normal ${font.mono};
    letter-spacing: 1.5px;
    color: ${color.cyan};
  }
  div p,
  a {
    font: 400 13px/normal ${font.sans};
    color: ${color.text};
    text-decoration: none;
  }
  .status {
    display: flex;
    align-items: center;
    gap: 6px;
    font: 400 11px/normal ${font.mono};
    color: ${color.success};
  }
`;
