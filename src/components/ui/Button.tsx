import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { color, font } from "../../theme";

type Variant = "primary" | "secondary" | "light";
type StyleProps = { variant?: Variant; block?: boolean };

// Figma "Button": Style=Primary / Secondary / Disabled.
const buttonCss = ({ variant = "primary", block }: StyleProps) => css`
  box-sizing: border-box;
  display: ${block ? "flex" : "inline-flex"};
  width: ${block ? "100%" : "auto"};
  align-items: center;
  justify-content: center;
  padding: 11px 22px;
  border-radius: 8px;
  font: ${variant === "secondary" ? 600 : 700} 13px/normal ${font.sans};
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  ${variant === "primary" && `background: ${color.accent}; color: ${color.onAccent};`}
  ${variant === "light" && `background: #fff; color: ${color.text};`}
  ${variant === "secondary" && `background: transparent; border-color: ${color.borderSoft}; color: ${color.text};`}

  &:focus-visible {
    outline: 2px solid ${color.cyan};
    outline-offset: 2px;
  }
  &:disabled {
    background: ${color.disabled};
    color: ${color.muted};
    font-weight: 600;
    border-color: transparent;
    cursor: not-allowed;
  }
`;

const passThrough = { shouldForwardProp: (p: string) => p !== "variant" && p !== "block" };

export const Button = styled("button", passThrough)<StyleProps>(buttonCss);
export const ButtonLink = styled(Link, passThrough)<StyleProps>(buttonCss);
