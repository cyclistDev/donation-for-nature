# Seeds of Tomorrow API

Small, read-only API for the tree, seed, and FAQ content currently shown by the static site. Records live in `data/` JSON files; no database or credentials are required.

## Project Structure

```
donation-for-nature/
├── api/                    # Backend API
│   ├── server.js
│   ├── package.json
│   ├── data/
│   │   ├── trees.json
│   │   ├── seeds.json
│   │   └── faqs.json
│   └── test/
├── frontend/               # Frontend assets
│   ├── index.html
│   ├── about.html
│   ├── tree.html
│   ├── seed.html
│   ├── fqa.html
│   ├── donation.html
│   ├── js/
│   │   ├── config.js
│   │   └── catalog.js
│   ├── style/
│   │   └── style.css
│   └── img/
└── render.yaml             # Render deployment config
```

## Run locally

From the `api/` directory:

```sh
npm install
npm start
```

The API serves both the backend API and the static frontend from port `3000` by default. Access the frontend at `http://localhost:3000`.

### Environment Variables

- `PORT`: Server port (default: 3000)
- `CORS_ORIGIN`: CORS origin for API requests (default: "*" for local development)
- `API_BASE_URL`: API base URL for frontend (default: "" for same-origin, or "http://localhost:3000" for local dev)

Set these in your shell or hosting provider's environment settings. The app does not load `.env` files automatically. For development, run `npm run dev`; run `npm test` for the API checks.

## Frontend connection

The API now serves the static frontend files, so both the frontend and API are served from the same origin. This eliminates CORS issues.

The frontend API URL is set in `frontend/js/config.js`. The default is an empty string (same origin) for production deployment. For local development with separate servers, you can set it to `http://localhost:3000` in the browser console.

## Deployment (Render)

This project is configured for deployment on Render using the `render.yaml` file in the repository root.

### Deploy to Render:

1. Push this repository to GitHub
2. Create a new web service on Render
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` configuration
5. Deploy!

The configuration:
- Uses Node.js environment
- Builds from the `api/` directory
- Serves both API and static frontend from a single service
- Uses port 10000 (Render's default)

### Environment Variables on Render:

In your Render service settings, add:
- `PORT`: 10000 (or leave default)
- `NODE_ENV`: production
- `CORS_ORIGIN`: (optional) leave empty for same-origin deployment

## Routes

- `GET /` - Serves index.html (frontend homepage)
- `GET /api/health` - Health check endpoint
- `GET /api/trees` and `GET /api/trees/:id` - Tree catalog
- `GET /api/seeds` and `GET /api/seeds/:id` - Seed catalog
- `GET /api/faqs` and `GET /api/faqs/:id` - FAQ data

Image values are paths relative to the frontend root, for example `img/Derm Kavsu.jpeg`. Unknown routes and item IDs return JSON `404` responses.

The catalog routes are public and read-only. Do not add payment credentials or other secrets to these files or to browser code. Donation processing should be implemented separately through a payment provider and server-side environment secrets.