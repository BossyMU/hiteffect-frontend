import styled from "@emotion/styled";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { games, shopTypes } from "../data/products";
import { color, font, shadow } from "../theme";

const VISIBLE_SETS = 4;

/** Figma "Navigation / Sidebar": games with their sets, shop types, contact. */
export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<Record<string, boolean>>({ [games[0].slug]: true });
  const [showAll, setShowAll] = useState(false);

  return (
    <Wrap aria-label="Store navigation">
      {games.map((game) => {
        const base = `/game/${game.slug}`;
        const active = pathname === base || pathname.startsWith(`${base}/`);
        const isOpen = open[game.slug];
        const sets = showAll ? game.sets : game.sets.slice(0, VISIBLE_SETS);
        const hidden = game.sets.length - VISIBLE_SETS;
        return (
          <Group key={game.slug}>
            <Heading>GAMES</Heading>
            <GameButton data-active={active}>
              <button type="button" className="name" onClick={() => navigate(base)}>
                {game.name}
              </button>
              <button
                type="button"
                className="chevron"
                aria-label={isOpen ? "Hide sets" : "Show sets"}
                aria-expanded={isOpen}
                onClick={() => setOpen((o) => ({ ...o, [game.slug]: !o[game.slug] }))}
              >
                <img src="figma/icon-chevron-down.svg" alt="" />
              </button>
            </GameButton>
            {isOpen && (
              <>
                <Sets>
                  {sets.map((s) => (
                    <SetLink key={s.slug} to={`${base}/set/${s.slug}`}>
                      {s.name}
                    </SetLink>
                  ))}
                </Sets>
                {!showAll && hidden > 0 && (
                  <MoreSets type="button" onClick={() => setShowAll(true)}>
                    +{hidden} more — View All Sets →
                  </MoreSets>
                )}
              </>
            )}
          </Group>
        );
      })}

      <Group>
        <Heading>SHOP</Heading>
        {shopTypes.map((t) => (
          <TypeLink key={t.slug} to={`/shop/${t.slug}`}>
            {t.name}
          </TypeLink>
        ))}
      </Group>

      <Divider />
      <ContactLink to="/contact">Contact Us</ContactLink>
    </Wrap>
  );
}

const Wrap = styled.nav`
  box-sizing: border-box;
  width: 210px;
  flex-shrink: 0;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 22px 18px;
  background: #fff;
  border: 1px solid ${color.border};
  border-radius: 14px;
  box-shadow: ${shadow.sidebar};
  overflow: hidden;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 174px;
`;

const Heading = styled.p`
  margin: 0;
  font: 400 10.5px/normal ${font.mono};
  letter-spacing: 2px;
  color: ${color.muted};
`;

// Nav/GameButton — cyan outline while browsing that game.
const GameButton = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  padding: 9px 8px 9px 10px;
  border: 1px solid transparent;
  border-radius: 7px;
  &[data-active="true"] {
    border-color: ${color.cyan};
  }
  button {
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  .name {
    font: 600 12.5px/normal ${font.sans};
    color: ${color.text};
  }
  .chevron {
    position: relative;
    width: 14px;
    height: 14px;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 15.8px;
      height: 14px;
    }
  }
`;

const Sets = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding-left: 14px;
`;

// Nav/SetLink — orange when active.
const SetLink = styled(NavLink)`
  padding: 6px 8px;
  border-radius: 6px;
  font: 400 12px/normal ${font.sans};
  color: ${color.muted};
  text-decoration: none;
  &.active {
    color: ${color.accent};
  }
`;

const MoreSets = styled.button`
  align-self: flex-start;
  padding: 2px 8px 2px 22px;
  border: 0;
  background: none;
  cursor: pointer;
  font: 400 10.5px/normal ${font.sans};
  color: ${color.muted};
`;

// Nav/TypeButton — cyan outline + semibold when active.
const TypeLink = styled(NavLink)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 34px;
  padding: 9px 10px;
  border: 1px solid transparent;
  border-radius: 7px;
  font: 400 12.5px/normal ${font.sans};
  color: ${color.muted};
  text-decoration: none;
  &.active {
    border-color: ${color.cyan};
    font-weight: 600;
    color: ${color.text};
  }
`;

const Divider = styled.div`
  width: 174px;
  height: 1px;
  background: ${color.border};
`;

const ContactLink = styled(Link)`
  padding: 9px 10px;
  font: 600 12.5px/normal ${font.sans};
  color: ${color.cyan};
  text-decoration: none;
`;
