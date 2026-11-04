
  # Car Sharing Platform

  This is a code bundle for Car Sharing Platform. The original project is available at https://www.figma.com/design/Y5joNanyZlRy1cjaVD2D3p/Car-Sharing-Platform.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## UI refresh (Go Together branding)
- Real Tailwind CSS v4 build (`@tailwindcss/vite`) replaces the pre-compiled stylesheet, so every utility class now works.
- Brand theme (navy / blue / orange) lives in `src/index.css` and `src/styles/globals.css`.
- Brand artwork: `src/images/Go Together City Ride.png` (hero banner uses an optimised copy in `src/assets/hero.jpg`; logo extracted to `src/assets/logo-*.png`).
- New components: `HowItWorks.jsx`, `Footer.jsx`. Redesigned: `Navbar`, `Hero`, `TripCard`, `FilterSection`, `Login`, `SignUp` headers.
- Vite config renamed to `vite.config.mts` (the Tailwind plugin is ESM-only).

Run: `npm install` then `npm run dev`
