## OnTrack Books

OnTrack Books is a React application for browsing a paginated catalogue of books. It fetches data from a remote API and displays each book’s title, author(s) and publication year, with pagination controls and routing for each page of results.

### Features

- **Paginated book listing**: Browse books page by page using `react-paginate`.
- **Book details**: See a book’s title, list of authors, and publication year in a Bootstrap-styled list.
- **Client-side routing**: Uses `react-router` so each page of results has its own URL (for example `/1`, `/2`).
- **Global state management**: Uses `redux`/`react-redux` to store the current page, total page count, and loaded books.
- **API integration**: Uses `axios` configured with the base URL `http://nyx.vima.ekt.gr:3000/api` to load books from `/books`.

### Tech Stack

- **React 16** with Create React App
- **Redux** and **react-redux**
- **react-router / react-router-dom**
- **react-bootstrap** and **bootstrap-sass**
- **react-paginate**
- **axios**
- **Sass** compiled with `node-sass-chokidar`

### Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the app in development**

   ```bash
   npm start
   ```

   This runs Sass compilation and the CRA dev server in parallel. Open `http://localhost:3000` in your browser.

3. **Build for production**

   ```bash
   npm run build
   ```

   This outputs an optimized production build to the `build` directory, including compiled CSS.

### API Notes

The app expects the external API at `http://nyx.vima.ekt.gr:3000/api` (configured in `src/axios.js`). If that API is unavailable or changes, the book list may fail to load; you can update the `baseURL` in `src/axios.js` to point to a compatible endpoint.

### Scripts

- **`npm start`**: Watch Sass files, then start the React development server.
- **`npm run build`**: Build Sass and bundle the app for production.
- **`npm test`**: Run the test runner.
- **`npm run eject`**: Eject from Create React App (one-way operation).
