import styled from "@emotion/styled";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { color, font } from "../theme";

export function BackLink({ to = "/", label = "Back to Home" }: { to?: string; label?: string }) {
  return (
    <Back to={to}>
      <span className="icon">
        <img src="figma/icon-arrow-left-sm.svg" alt="" />
      </span>
      {label}
    </Back>
  );
}

export type Crumb = { label: string; to?: string };

/** Breadcrumbs; the last crumb is the current page. `boldLast` matches the product screen. */
export function Breadcrumbs({ items, boldLast }: { items: Crumb[]; boldLast?: boolean }) {
  return (
    <Trail aria-label="Breadcrumb">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={i}>
            {i > 0 && <span>/</span>}
            {c.to && !last ? (
              <Link to={c.to}>{c.label}</Link>
            ) : (
              <span
                aria-current={last ? "page" : undefined}
                style={last ? { color: color.text, fontWeight: boldLast ? 600 : 400 } : undefined}
              >
                {c.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </Trail>
  );
}

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: 400 12.5px/normal ${font.sans};
  color: ${color.muted};
  text-decoration: none;
  width: fit-content;
  .icon {
    position: relative;
    width: 14px;
    height: 14px;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 16.75px;
      height: 15.75px;
    }
  }
`;

const Trail = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font: 400 12.5px/normal ${font.sans};
  color: ${color.muted};
  a {
    color: ${color.muted};
    text-decoration: none;
  }
`;
