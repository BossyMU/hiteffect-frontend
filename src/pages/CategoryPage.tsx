import styled from "@emotion/styled";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { CountText, MainPanel, PageTitle } from "../components/Layouts";
import { BackLink, Breadcrumbs, type Crumb } from "../components/PageNav";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import { findGame, findSet, findType, type Product } from "../data/products";
import { itemCount } from "../lib/format";

type Mode = "game" | "set" | "type" | "search";

/** Category / Card Packs / Sleeves / … screens — one template, filtered by route. */
export default function CategoryPage({ mode }: { mode: Mode }) {
  const { gameSlug, setSlug, typeSlug } = useParams();
  const [params] = useSearchParams();
  const { products } = useProducts();

  let title = "";
  let crumbs: Crumb[] = [{ label: "Home", to: "/" }];
  let list: Product[] = [];

  if (mode === "game" || mode === "set") {
    const game = findGame(gameSlug);
    const set = mode === "set" ? findSet(setSlug) : undefined;
    if (!game || (mode === "set" && !set)) return <Navigate to="/" replace />;
    const singles = products.filter((p) => p.game === game.slug && p.set);
    list = set ? singles.filter((p) => p.set === set.slug) : singles;
    title = set?.name ?? game.name;
    crumbs.push({ label: game.name, to: `/game/${game.slug}` });
    if (set) crumbs.push({ label: set.name });
  } else if (mode === "type") {
    const type = findType(typeSlug);
    if (!type) return <Navigate to="/" replace />;
    list = products.filter((p) => p.type === type.slug);
    title = type.name;
    crumbs.push({ label: type.name });
  } else {
    const q = (params.get("q") ?? "").trim().toLowerCase();
    list = q ? products.filter((p) => p.name.toLowerCase().includes(q) || p.cardNo.toLowerCase().includes(q)) : [];
    title = q ? `Results for “${params.get("q")?.trim()}”` : "Search";
    crumbs = [{ label: "Home", to: "/" }, { label: "Search" }];
  }

  return (
    <MainPanel>
      <BackLink />
      <Breadcrumbs items={crumbs} />
      <PageTitle>{title}</PageTitle>
      <CountText>{itemCount(list.length)}</CountText>
      <Grid>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Grid>
    </MainPanel>
  );
}

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  width: 100%;
`;
