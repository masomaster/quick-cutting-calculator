# Quilt Cutting Calculator

A simple React + Vite app that helps compute fabric/yardage and cutting instructions for quilt blocks.

## About

This project is a small single-page React app (Vite) that calculates cutting instructions for quilt blocks and half-square triangles. It uses:

- React 18
- Vite dev server
- Tailwind CSS
- lucide-react for icons

## Quick start

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Install

1. Install dependencies:

```
npm install
```

2. Start development server (opens at http://localhost:5173 by default):

```
npm run dev
```

3. Build for production:

```
npm run build
```

4. Preview the production build locally:

```
npm run preview
```

## Project structure (important files)

- `index.html` — HTML entry with `<div id="root"></div>` and module script to `/src/main.jsx`
- `src/main.jsx` — React mount logic
- `src/App.jsx` — Main app UI and logic
- `src/index.css` — Tailwind + base styles
- `vite.config.js` — Vite + React plugin

## Common troubleshooting

### Blank page in dev (what to check)

1. Open your browser DevTools Console (Cmd+Option+I on macOS) and look for red errors. Most blank-page situations are caused by a runtime error that prevents React from rendering.
2. Check the Network tab and verify module requests succeed (e.g. `/src/main.jsx`, `/src/App.jsx`). If a module request returns 404 or an HTML error page, the app won't load.
3. Look at the terminal running `npm run dev` — Vite logs build and HMR errors there too.
4. Confirm React is installed:

```
npm ls react react-dom --depth=0
```


### If dev server isn't responding

- Make sure `npm run dev` is running in a terminal and shows `VITE v... ready` and `Local: http://localhost:5173/`.
- If you changed ports or used `--host`, open the corresponding URL printed by Vite.

## Notes & next steps

- This README gives quick troubleshooting for the blank page + lucide-import issue you encountered. If you continue to see errors after checking the console and making the icon import change, copy the full console error and paste it here so we can iterate.

- Consider adding a simple smoke test (a minimal render) during debugging: temporarily render `Hello world` from `src/main.jsx` or `src/App.jsx` to verify React mounts.

## License

MIT
