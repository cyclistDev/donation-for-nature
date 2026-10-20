# Donation for Nature - Seeds of Tomorrow

A nature conservation website with a simple Express API serving tree, seed, and FAQ content. The project is designed for easy deployment on Render, serving both the API and static frontend from a single service.

## Project Overview

This project features:
- **Static Frontend**: HTML pages for Home, About, Trees, Seeds, FAQs, and Donation
- **Express API**: Read-only API serving JSON data for trees, seeds, and FAQs
- **Graceful Degradation**: Frontend works even if API is unavailable
- **Single-Service Deployment**: Optimized for Render with both API and frontend served together

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for API routing
- **CORS** - Cross-Origin Resource Sharing middleware

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Styling with custom CSS
- **Bootstrap 5.3.3** - Responsive UI framework (via CDN)
- **AOS (Animate On Scroll)** - Scroll animation library (via CDN)
- **Vanilla JavaScript** - API integration and dynamic content loading

### Data Storage
- **JSON Files** - Static data storage for trees, seeds, and FAQs
  - `api/data/trees.json` - Tree catalog data
  - `api/data/seeds.json` - Seed catalog data
  - `api/data/faqs.json` - FAQ content

### Deployment
- **Render** - Cloud hosting platform
- **Git** - Version control
- **Node.js Test Runner** - Built-in Node.js testing

## Core Concepts

### Architecture Pattern
- **Monolithic Single-Service**: Both API and static frontend served from one Express application
- **Same-Origin Deployment**: Eliminates CORS issues by serving frontend and API from the same domain
- **Read-Only API**: All endpoints are GET requests with no write operations
- **Static Data**: No database required; data stored in JSON files

### API Design
- **RESTful Endpoints**: Standard REST API patterns
- **JSON Responses**: All responses in JSON format
- **Graceful Fallback**: Frontend displays hardcoded content if API is unavailable
- **Health Check**: `/api/health` endpoint for monitoring

### Frontend-Backend Integration
- **Dynamic Content Loading**: JavaScript fetches data from API to populate catalogs
- **Fallback Mechanism**: Built-in HTML content serves as fallback when API fails
- **Client-Side Configuration**: `API_BASE_URL` configurable via `config.js`
- **Environment-Aware**: Works in both development and production environments

### Data Structure
Each catalog item follows a consistent schema:
```json
{
  "id": "unique-identifier",
  "name": "Display Name",
  "image": "img/path/to/image.jpg"
}
```

FAQs include:
```json
{
  "id": "unique-identifier",
  "question": "Question text",
  "answer": "Answer text"
}
```

## Key Features

### 1. Catalog Pages
- **Trees Page**: Displays tree species with images and names
- **Seeds Page**: Shows seed varieties with visual representation
- **FAQ Page**: Accordion-style frequently asked questions

### 2. Dynamic Content
- API-driven content loading for catalogs
- Automatic image updates from JSON data
- Real-time FAQ updates from backend

### 3. Responsive Design
- Mobile-first approach using Bootstrap
- Responsive navigation with collapsible menu
- Flexible card layouts for different screen sizes

### 4. User Experience
- Smooth scroll animations (AOS library)
- Interactive hover effects on gallery cards
- Professional nature conservation theme

### 5. Development Experience
- Hot-reload in development mode (`npm run dev`)
- Built-in testing framework
- Clear separation of concerns
- Comprehensive documentation

## Project Constraints & Decisions

### Why JSON Files Instead of Database?
- **Simplicity**: No database setup or maintenance required
- **Portability**: Easy to version control and deploy
- **Performance**: Fast read access for small datasets
- **Cost**: No database hosting costs
- **Suitability**: Perfect for read-only catalog content

### Why Single-Service Deployment?
- **Cost Efficiency**: One Render service instead of two
- **Simplified CORS**: Same-origin deployment eliminates CORS complexity
- **Easier Maintenance**: Single codebase to manage
- **Faster Development**: No need to manage separate frontend build process
- **Suitability**: Ideal for small to medium projects

### Why Graceful Degradation?
- **Reliability**: Frontend works even if API fails
- **Better UX**: Users always see content, never empty pages
- **SEO Friendly**: Static content is indexable by search engines
- **Progressive Enhancement**: API enhances static content when available

## Security Considerations

### Current Security Measures
- ✅ No hardcoded credentials in codebase
- ✅ No secrets committed to git
- ✅ Environment variables for configuration
- ✅ Public read-only API (no sensitive data)
- ✅ CORS configuration for origin restriction
- ✅ X-powered-by header disabled

### Future Security Considerations
- When adding payment processing:
  - Implement server-side payment integration
  - Use Render environment variables for payment API keys
  - Never expose payment secrets in frontend code
  - Implement proper webhook verification
  - Add rate limiting for API endpoints

## Performance Considerations

### Optimization Strategies
- Static file serving through Express
- CDN usage for Bootstrap and AOS libraries
- No build step required for frontend
- Lightweight JSON data files
- Efficient HTTP caching headers (can be added)

### Scalability Notes
- Current architecture suitable for:
  - Small to medium traffic (< 10k daily visitors)
  - Read-heavy workloads
  - Static content delivery
- For larger scale, consider:
  - CDN for static assets
  - Database for dynamic content
  - Separate frontend/backend services
  - Load balancing

## Project Structure

```
donation-for-nature/
├── api/                    # Backend API
│   ├── server.js          # Express server with static file serving
│   ├── package.json
│   ├── data/              # JSON data files
│   │   ├── trees.json
│   │   ├── seeds.json
│   │   └── faqs.json
│   ├── test/              # API tests
│   └── README.md          # API documentation
├── frontend/             # Frontend assets
│   ├── index.html         # Homepage
│   ├── about.html         # About page
│   ├── tree.html          # Trees catalog
│   ├── seed.html          # Seeds catalog
│   ├── fqa.html           # FAQ page
│   ├── donation.html      # Donation page
│   ├── js/
│   │   ├── config.js      # API configuration
│   │   └── catalog.js     # API integration
│   ├── style/
│   │   └── style.css      # Stylesheets
│   └── img/               # Images
├── render.yaml            # Render deployment configuration
└── README.md              # This file
```

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup

1. Install dependencies:
```bash
cd api
npm install
```

2. Start the server:
```bash
npm start
```

3. Access the application:
- Frontend: http://localhost:3000
- API health: http://localhost:3000/api/health
- API endpoints: http://localhost:3000/api/trees, /api/seeds, /api/faqs

### Development Mode

For auto-reloading during development:
```bash
npm run dev
```

### Testing

Run API tests:
```bash
npm test
```

## Deployment to Render

This project is pre-configured for deployment on Render using the `render.yaml` file.

### Steps:

1. **Push to GitHub**
   - Initialize git repository (if not already done)
   - Push your code to GitHub

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Sign up/login
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Render will detect the `render.yaml` configuration automatically

3. **Configure Environment Variables** (optional)
   - `PORT`: 10000 (Render's default)
   - `NODE_ENV`: production
   - `CORS_ORIGIN`: Leave empty for same-origin deployment

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your application
   - Your site will be live at `https://your-service-name.onrender.com`

### Render Configuration

The `render.yaml` file configures:
- **Type**: Web service
- **Environment**: Node.js
- **Build Command**: `cd api && npm install`
- **Start Command**: `cd api && npm start`
- **Port**: 10000

## API Documentation

For detailed API documentation, see [api/README.md](api/README.md).

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/trees` - List all trees
- `GET /api/trees/:id` - Get specific tree
- `GET /api/seeds` - List all seeds
- `GET /api/seeds/:id` - Get specific seed
- `GET /api/faqs` - List all FAQs
- `GET /api/faqs/:id` - Get specific FAQ

## Security Notes

- ✅ No hardcoded credentials in the codebase
- ✅ No secrets committed to git
- ✅ Environment variables used for configuration
- ✅ Public read-only API (no sensitive data)
- ⚠️ Payment processing should be implemented separately with server-side secrets

## Customization

### Adding New Content

1. **Trees/Seeds**: Edit `api/data/trees.json` or `api/data/seeds.json`
2. **FAQs**: Edit `api/data/faqs.json`
3. **Images**: Add images to `frontend/img/` and update references in HTML/JSON files

### Styling

Edit `frontend/style/style.css` to customize the appearance.

### Frontend Pages

Edit HTML files in the `frontend/` directory to modify page content.

## Troubleshooting

### API returns 404 on frontend
- Ensure the API is running and serving static files correctly
- Check that `frontend/js/config.js` has the correct `API_BASE_URL`

### Images not loading
- Verify image paths in HTML files match actual files in `frontend/img/`
- Check that images were moved to the `frontend/img/` directory after reorganization

### CORS errors
- Ensure `CORS_ORIGIN` is set correctly in environment variables
- For same-origin deployment (recommended), CORS should not be an issue

## License

This project is for educational and demonstration purposes.

## Contributing

Feel free to submit issues and pull requests for improvements.
