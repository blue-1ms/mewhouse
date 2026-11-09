# Mew House maintenance page

Static GitHub Pages site. All runtime scripts, styles, and images are served locally.

- `index.html`: page structure
- `styles.css`: layout and responsive sizing
- `background.js`: custom approximate background, not the official Chroma Current
- `card.jsx`: official Holo Card configuration (Mew + glitter)
- `vendor/react-bits/`: upstream component, stylesheet, image and license
- `assets/card.js`, `assets/card.css`: bundled runtime, including React

Run `npm ci && npm run build` after editing the card source. Keep generated assets
with the site for GitHub Pages. No Node server or browser-side JSX compiler is needed.
Preview with `npm run preview` at http://127.0.0.1:4173/.

React Bits source: https://github.com/DavidHDev/react-bits
Pinned revision: `b0422bb475ac9ec1fe1680290970494ceff5d4eb`.
Original component source and Mew demo image are preserved. See
`vendor/react-bits/LICENSE.md` and the generated JS legal notice for attribution.
