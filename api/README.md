# Seeds of Tomorrow API

Small, read-only API for the tree, seed, and FAQ content currently shown by the static site. Records live in `data/` JSON files; no database or credentials are required.

## Run locally

From this directory:

```sh
npm install
npm start
```

The API listens on port `3000` by default. Set `PORT` in the process environment to use another port. `CORS_ORIGIN` optionally restricts browser access to one frontend origin; it defaults to `*` for local development. Copy `.env.example` as a reference and configure these values in your shell or hosting provider's environment settings. The app does not load `.env` files automatically. For development, run `npm run dev`; run `npm test` for the API checks.

## Frontend connection

The existing tree, seed, and FAQ pages request their content from this API and retain their HTML content if the API is unavailable. The frontend API URL is set in `../js/config.js`. The default is `http://localhost:3000` for local development; change it to the deployed API's public origin before publishing the frontend. This URL is public configuration, not a credential.

When frontend and API use different origins, set `CORS_ORIGIN` to the deployed frontend's exact origin, such as `https://your-site.example`. For production, configure your hosting or reverse proxy so both are served from one origin where practical, or restrict CORS to that deployed frontend origin.

To test locally, start the API with `npm start` in this directory and serve the repository root with a static web server such as the VS Code Live Server extension. Open `tree.html`, `seed.html`, or `fqa.html` from that server rather than opening the pages as `file://` URLs.

## Routes

- `GET /api/health`
- `GET /api/trees` and `GET /api/trees/:id`
- `GET /api/seeds` and `GET /api/seeds/:id`
- `GET /api/faqs` and `GET /api/faqs/:id`

Image values are paths relative to the static site's root, for example `img/Derm Kavsu.jpeg`. Unknown routes and item IDs return JSON `404` responses.

The catalog routes are public and read-only. Do not add payment credentials or other secrets to these files or to browser code. Donation processing should be implemented separately through a payment provider and server-side environment secrets.