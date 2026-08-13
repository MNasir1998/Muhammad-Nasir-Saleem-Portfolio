# Nasir Saleem — Portfolio (pink/neon "GitHub terminal" theme)

A bold, single-page portfolio for a Business Development & Sales
professional, styled after the popular pink/neon "GitHub profile card"
aesthetic — a code-terminal hero with a typing effect, a floating ID-card
graphic, repo-style project cards, commit-log style experience timeline,
and neon stat bars. Plain HTML, CSS, and JavaScript — no build step, no
dependencies. Ready to push straight to GitHub Pages.

## What's inside

- `index.html` — page structure and content
- `styles.css` — design system (colors, type, layout, animation)
- `script.js` — typing effect, particle background, scroll reveals,
  animated counters, bar-chart fill, the deal-ledger ticker, and FAQ accordion
- `assets/profile.jpg` — profile portrait (used in both the hero and the ID card)
- `assets/favicon.png` — browser tab icon

## Updating your numbers (revenue, deals, etc.)

The ID card, hero stats, and "Deal Stats" card all used to be a static image —
they're now plain HTML/CSS, so updating a number is just editing text in
`index.html`. No image regeneration needed, ever. The current revenue figure
(`$180K+`) appears in these places — search `index.html` for `180` to find
all of them:

- `<meta name="description">` and `<meta property="og:description">` (page metadata)
- The hero trust-strip counter (`data-count="180"`)
- The "About Me" bullet list (`$180,000+`)
- The "Deal Stats & Graphs" counter (`data-count="180"`)
- The ID card's `CLEARANCE` row (`id="cardClearance"`)
- `script.js` — the terminal typing phrase (`"Closing $180K+ across IT & gaming"`)

Just find-and-replace the number across these — a few seconds of editing,
no design tools needed.

## Deploy with GitHub Pages (step by step)

1. **Create a new repository** on GitHub (any name — e.g. `nasir-portfolio`).
   Public repos get free GitHub Pages hosting.
2. **Upload these files** to the repo:
   - Easiest way: open the repo on GitHub → **Add file → Upload files** →
     drag in `index.html`, `styles.css`, `script.js`, `README.md`, and the
     whole `assets/` folder → commit directly to `main`.
   - Or with git:
     ```bash
     git init
     git add .
     git commit -m "Add portfolio site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<repo-name>.git
     git push -u origin main
     ```
3. **Turn on Pages**: in the repo, go to **Settings → Pages**. Under
   "Build and deployment", set **Source** to **Deploy from a branch**, branch
   `main`, folder `/ (root)`. Click **Save**.
4. Wait 1–2 minutes, then refresh that Pages settings screen — it will show
   your live URL: `https://<your-username>.github.io/<repo-name>/`.

No build tools, no npm install, nothing else needed — plain HTML/CSS/JS runs
exactly as-is once GitHub Pages serves it.

## Editing content

- **CV link**: search for `drive.google.com` in `index.html` — appears in
  the nav, hero, and final CTA.
- **Contact details**: email, phone, and LinkedIn are set in the `#contact`
  section and the footer.
- **Terminal typing phrases**: edit the `phrases` array in `script.js`.
- **Deals ticker**: edit the `deals` array in `script.js`.
- **Signature deals repo cards**: each is a `.repo-card` block in
  `index.html`'s `#deals` section.
- **ID card**: it's a live HTML/CSS component (`.id-card` in `index.html` /
  styled in `styles.css`), not an image — edit the text directly, no
  regeneration needed.

## Notes

- All animations respect `prefers-reduced-motion`.
- Fully responsive down to small mobile widths, with a slide-down mobile nav.
- Fonts (Baloo 2, JetBrains Mono, Inter) load from Google Fonts via CDN link
  tags in `<head>` — no local font files needed.
