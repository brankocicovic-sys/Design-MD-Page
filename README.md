# Design-MD-Page

A long-scroll editorial showcase of the **Shopview Design System** — tokens, typography, color, spacing, iconography, and component primitives — rendered as a single React-in-the-browser page (Babel standalone, no build step).

## Run it

It's plain static HTML/JS. Open `index.html` (which redirects to `design-md/`) with any local web server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

Or open `design-md/index.html` directly via a server (file:// won't work because the page fetches local SVGs for icons).

## Layout

```
.
├── index.html                         redirect → design-md/
├── design-md/
│   ├── index.html                     entry point (mounts the page)
│   ├── colors_and_type.css            design tokens + base typography
│   ├── variation-b.jsx                the full editorial page
│   ├── filter-bar.jsx                 filter bar + STATUSES / CUSTOMERS data
│   ├── filter-chip.jsx                pill filter trigger
│   ├── filter-dropdown.jsx            multi-select + status dropdowns
│   ├── mobile-filters.jsx             mobile filter sheet
│   ├── tweaks-panel.jsx               density / theme tweaks (top-right)
│   ├── logo-primary-light.svg
│   ├── symbol-primary.svg
│   ├── assets/                        filter-chip icons
│   └── fonts/                         Inter 18pt + Inter 28pt
├── preview/icons/                     entity icons (work order, asset, user, …)
└── ui_kits/shopview-app/
    └── components.jsx                 primitives: Button, Badge, Card, Avatar, Toggle, Icon, …
```

## Stack

- React 18 + ReactDOM (UMD)
- Babel Standalone (in-browser JSX transform)
- No bundler, no package manager — just static files.
