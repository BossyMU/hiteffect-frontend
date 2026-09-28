## Development

Install dependencies and run the dev server (Vite):

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173) in your browser.

Notes:

- This workspace uses React + Vite + Emotion. The UI is built from the Figma file "Hit Effect — TCG Shop" (pages "01 — Components" and "02 — Storefront Screens"); design tokens live in `src/theme.ts` and exported Figma assets in `public/figma/`.
- To build a production bundle: `npm run build`.

## Mock data and workflow

There is no backend. The catalogue is in `src/data/products.ts`; cart, stock levels, orders and contact messages are kept in `localStorage` (`he_cart`, `he_stock`, `he_orders`, `he_messages`). Clear site data in the browser to reset the demo.

| Route | Screen |
| --- | --- |
| `/` | Home (hero, New Arrivals, Clearance, Best Sellers) |
| `/game/flesh-and-blood` | Category (all singles) |
| `/game/flesh-and-blood/set/:set` | Set listing |
| `/shop/:type` | Sleeves, Card Packs, Card Boxes, Starter Decks, Accessories |
| `/search?q=` | Search by card name or number (e.g. `AOM001`) |
| `/product/:id` | Product Detail (foil picker, quantity, related) |
| `/cart` | Cart |
| `/checkout` | Payment |
| `/order/:ref` | Thank You |
| `/order/:ref/receipt` | Receipt |
| `/contact` | Contact Us |

Placing an order waits ~1s (mock payment), records the order, reduces stock (sold-out states update everywhere) and empties the cart.
