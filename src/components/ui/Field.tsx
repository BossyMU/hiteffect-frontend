import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { color, font } from "../../theme";

// Figma "Input" and "TextArea".
const fieldCss = css`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid ${color.border};
  border-radius: 8px;
  background: #fff;
  font: 400 13px/normal ${font.sans};
  color: ${color.text};
  &::placeholder {
    color: ${color.muted};
    opacity: 1;
  }
  &:focus {
    outline: none;
    border-color: ${color.cyan};
  }
  &[aria-invalid="true"] {
    border-color: ${color.danger};
  }
`;

export const Input = styled.input`
  ${fieldCss};
  height: 42px;
`;

export const TextArea = styled.textarea`
  ${fieldCss};
  height: 110px;
  resize: none;
`;

export const Label = styled.label`
  display: block;
  margin: 0;
  font: 400 10.5px/normal ${font.mono};
  letter-spacing: 2px;
  color: ${color.muted};
`;
