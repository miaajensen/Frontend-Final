# Belmont Abbey Bites

Belmont Abbey Bites is a React application for discovering nearby restaurants based on what you are looking for. Choose a category to see nearby places, then select a result to view its details.

## Features

- Browse by category: Studying, Quick Bite, Late Night, Pre-Game, and Post-Game.
- Find nearby restaurants using browser location and the Geoapify Places API.
- View restaurant names, addresses, and available categories.
- Responsive interface for desktop and mobile screens.

The Favorites and Login pages currently provide introductory UI and are not connected to complete favorites or authentication workflows.

## Requirements

- Node.js and npm
- A Geoapify API key
- Browser location permission for nearby restaurant searches

## Setup

1. Change to the application directory:

   ```sh
   cd "Belmont Abbey Bites"
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `Belmont Abbey Bites` directory:

   ```env
   VITE_GEOAPIFY_API_KEY=your_geoapify_api_key
   ```

   Keep API keys private and do not commit `.env` files.

4. Start the development server:

   ```sh
   npm run dev
   ```

Open the local URL printed by Vite and allow location access when prompted.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm test` | Run the Vitest and React Testing Library suite. |
| `npm run lint` | Run Oxlint. |

## Testing

The project uses Vitest, jsdom, and React Testing Library. Tests cover rendering, navigation, shared application state, and restaurant selection and details. Run them from the application directory:

```sh
npm test
```

## Technology

- React and React Router
- Vite
- Geoapify Places API
- Vitest and React Testing Library

## AI assistance

AI was used to assist with some of the testing and with CSS design and styling. The test suite can be run with `npm test`.
