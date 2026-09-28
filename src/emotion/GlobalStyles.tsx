import { Global, css } from "@emotion/react";
import { color, font, pageBackground } from "../theme";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        html {
          min-height: 100%;
          background: ${pageBackground} fixed;
        }
        body {
          margin: 0;
          min-height: 100vh;
          font-family: ${font.sans};
          color: ${color.text};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        p,
        h1,
        h2,
        h3 {
          margin: 0;
        }
        button,
        input,
        textarea {
          font-family: inherit;
        }
        a:focus-visible,
        button:focus-visible {
          outline: 2px solid ${color.cyan};
          outline-offset: 2px;
        }
        @media print {
          html {
            background: #fff;
          }
          .no-print {
            display: none !important;
          }
        }
      `}
    />
  );
}
