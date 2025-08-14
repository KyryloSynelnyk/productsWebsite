# Next.js E‑commerce Checkout

Fully functional product catalog and checkout demo built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion. Data is fetched from the public DummyJSON API.

## Features

- __Catalog__: search, sorting, pagination, and category filtering.
- __Product details__: dedicated checkout page with quantity, promo codes, and animated totals.
- __Theme switch__: light/dark toggle with persisted preference and FOUC-safe pre-hydration script.
- __Image modal__: in-catalog “View Image” opens a modal with keyboard navigation and backdrop/ESC to close.
- __Responsive UI__: mobile-friendly layout and accessible controls.

## Tech Stack

- Next.js 13+ App Router, React, TypeScript
- Tailwind CSS (with custom CSS variables for theming)
- Framer Motion (animations)
- DummyJSON API for products

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Project Structure

- `src/app/page.tsx` — catalog with controls and pagination
- `src/app/product/[id]/page.tsx` — product details + checkout
- `src/components/ProductGridClient.tsx` — client grid with image modal
- `src/components/ProductCheckout.tsx` — checkout UI/logic
- `src/components/ThemeToggle.tsx` — theme switcher
- `src/app/globals.css` — theme variables and global styles
- `src/types/product.ts` — shared `Product` type

## Notable Implementation Details

- __Theming__: `html.dark` toggles CSS variables in `globals.css`. Components use variables like `--background`, `--foreground`, `--card-bg`, etc., instead of hard-coded colors.
- __FOUC prevention__: An inline script in `src/app/layout.tsx` sets the theme class before hydration.
- __Type safety__: Shared `Product` type in `src/types/product.ts`. Avoids `any` in props (`ProductGridClient` and `page.tsx`).
- __Image modal__: Backdrop click closes, ESC closes, and Arrow keys navigate between images.

## Promo Codes

See `src/components/ProductCheckout.tsx` for built-in codes (e.g., `SAVE10`, `SAVE20`, `WELCOME5`). The logic validates and applies fixed/percent discounts.

## Development Notes / Best Practices

- Prefer shared types (`src/types/*`) and avoid `any`.
- Keep server data fetching on the server (in `page.tsx`) and interactive UI in client components.
- Use CSS variables for theme-aware colors; avoid Tailwind dark: variants where variables suffice.
- Accessibility: buttons/links use appropriate semantics; modal uses `role="dialog"` and `aria-modal`.

## Deployment

Any Next.js-compatible platform works (Vercel, Netlify, etc.). Build as usual:

```bash
npm run build && npm start
```

No environment variables are required.
