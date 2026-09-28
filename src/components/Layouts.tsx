import styled from "@emotion/styled";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { color, font, shadow } from "../theme";
import Header from "./Header";
import Sidebar from "./Sidebar";

function ScrollToTop() {
  const { pathname } = useLocation();
  // Braces matter: newer browsers return a Promise from scrollTo, and an
  // effect's return value is treated as its cleanup function.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Screens with header + sidebar + "Content / Main" panel. */
export function StoreLayout() {
  return (
    <Page>
      <ScrollToTop />
      <Header />
      <Body>
        <Sidebar />
        <Outlet />
      </Body>
    </Page>
  );
}

/** Payment / Thank You / Receipt: no chrome, card centred on the gradient. */
export function CheckoutLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

/** Figma "Content / Main". */
export const MainPanel = styled.main<{ gap?: number }>`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  min-height: 819px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(p) => p.gap ?? 20}px;
  padding: 24px;
  background: #fff;
  border: 1px solid ${color.borderHeader};
  border-radius: 14px;
  box-shadow: ${shadow.main};
  overflow: hidden;
`;

export const PageTitle = styled.h1`
  margin: 0;
  width: 100%;
  font: 700 26px/normal ${font.display};
  color: ${color.text};
`;

export const CountText = styled.p`
  margin: 0;
  width: 100%;
  font: 400 12.5px/normal ${font.mono};
  color: ${color.muted};
`;

const Page = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

const Body = styled.div`
  display: flex;
  gap: 28px;
  align-items: flex-start;
`;
