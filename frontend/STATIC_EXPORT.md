# BetDAG Static Export Guide

This guide explains how to build and deploy the BetDAG frontend as a static export. The application has been configured to work without a Node.js server at runtime, making it suitable for deployment to static hosting platforms like Vercel, Netlify, GitHub Pages, or any static file hosting service.

## Why Static Export?

Static exports offer several advantages:
- Faster page loads (pre-rendered HTML)
- Better security (no server-side vulnerabilities)
- Lower hosting costs
- Easy deployment to CDNs

## Configuration Details

The application has been configured with:

```javascript
// next.config.mjs
output: 'export',
images: {
  unoptimized: true,
},
```

This tells Next.js to:
1. Generate static HTML/CSS/JS files for all pages
2. Skip optimization of images (required for static export)

## API Routes & Dynamic Data

Since static exports cannot include server-side API routes, we've made these adaptations:

1. Created static JSON data files in `/public/data/`
2. Created client-side services to fetch this static data
3. Updated components to work with this static data pattern

## Building the Static Export

To build the static export:

```bash
# Install dependencies
npm install

# Build the static export
npm run build
```

The static export will be generated in the `out` directory.

## Deployment Instructions

### Vercel

1. Push your changes to your git repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the Next.js configuration and deploy correctly

### Netlify

1. Push your changes to your git repository
2. Connect your repository to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `out`

### GitHub Pages

1. Push your changes to your git repository
2. Create a `.github/workflows/deploy.yml` file with GitHub Actions configuration
3. Configure it to run `npm run build` and deploy the `out` directory

## Web3 Functionality

The web3 functionality (wallet connection, blockchain interactions) is implemented entirely client-side. The application:

1. Renders a basic shell during static generation
2. Initializes web3 components only in the browser
3. Uses conditional checks like `typeof window !== 'undefined'` to ensure code runs only in the browser

## Environment Variables

Ensure these environment variables are set in your deployment platform:

```
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
GEMINI_API_KEY=your_gemini_api_key
```

## Testing

After deployment, test these key functionalities:

1. Home page loads correctly
2. Wallet connection works
3. Navigation between pages works
4. Static data is displayed correctly

## Troubleshooting

If you encounter issues:

1. Check browser console for errors
2. Verify environment variables are set correctly
3. Ensure all needed static data files are in the `/public/data/` directory
4. Verify your hosting platform is configured to handle client-side routing