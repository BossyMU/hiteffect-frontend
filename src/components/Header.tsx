import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { color, font, shadow } from "../theme";
import Logo from "./Logo";

/** Figma "Layout / Header": logo, search field, spacer, cart count. */
export default function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  return (
    <Bar>
      <Link to="/" aria-label="Hit Effect home">
        <Logo width={179.679} height={86} />
      </Link>
      <Search
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const q = query.trim();
          navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
        }}
      >
        <span className="icon">
          <img src="figma/icon-search.svg" alt="" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by card name or number"
          aria-label="Search by card name or number"
        />
      </Search>
      <Spacer />
      <CartLink to="/cart" aria-label={`Cart, ${totalItems} items`}>
        <img src="figma/icon-cart.svg" alt="" width={20} height={20} />
        <span>{totalItems}</span>
      </CartLink>
    </Bar>
  );
}

const Bar = styled.header`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 16px 28px;
  background: #fff;
  border-bottom: 1px solid ${color.borderHeader};
  border-radius: 14px;
  box-shadow: ${shadow.header};
  overflow: hidden;
  a:first-of-type {
    display: flex;
    flex-shrink: 0;
  }
`;

const Search = styled.form`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 360px;
  height: 36px;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 8px;
  flex-shrink: 1;
  &:focus-within {
    border-color: ${color.cyan};
  }
  .icon {
    position: relative;
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 17.8px;
      height: 17.8px;
    }
  }
  input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    padding: 0;
    background: transparent;
    font: 400 13px/normal ${font.sans};
    color: ${color.text};
  }
  input::placeholder {
    color: ${color.muted};
    opacity: 1;
  }
  input::-webkit-search-cancel-button {
    display: none;
  }
`;

const Spacer = styled.div`
  flex: 1 0 0;
  height: 100px;
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font: 700 13px/normal ${font.mono};
  color: ${color.text};
`;
