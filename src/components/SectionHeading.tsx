import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { color, font } from "../theme";

type Props = { kicker: string; title: string; action?: ReactNode };

/** Kicker + Cinzel title + hairline rule, as used for every home/related section. */
export default function SectionHeading({ kicker, title, action }: Props) {
  return (
    <Row>
      <Kicker>{kicker}</Kicker>
      <Title>{title}</Title>
      <Rule />
      {action}
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

// The Figma kicker colour is var(--color/text-primary) #f5f6fa, near-invisible on white by design.
const Kicker = styled.span`
  font: 400 11px/normal ${font.mono};
  letter-spacing: 2px;
  color: ${color.kicker};
  white-space: nowrap;
`;

const Title = styled.h2`
  margin: 0;
  font: 700 20px/normal ${font.display};
  letter-spacing: 0.5px;
  color: ${color.text};
  white-space: nowrap;
`;

const Rule = styled.div`
  flex: 1 0 0;
  height: 1px;
  background: ${color.border};
`;
