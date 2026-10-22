# OnTrack Books

Paginated book catalogue written by [Wan Yau](https://github.com/WanCodes) for the OnTrack Retail front-end exercise.

The app is a Create React App project that loads books from a remote JSON API and renders them with React Bootstrap. Choosing a page writes that page number into the URL. The first version landed in November 2018. A January 2019 pass moved the catalogue into Redux so the pager and the list share one page of results. Dependency versions are the ones from that period.

## Exercise

The brief asked for a React app that:

1. Calls `POST /api/books` and prints the results as a list.
2. Paginates that list, with the page number stored in the URL so a refresh keeps the same page.
3. Uses React Bootstrap for the layout.
4. Compiles a Bootstrap theme whose only change from stock Bootstrap is the primary colour `#1D7874`.
5. Is published on GitHub.

Search was optional: a field that sends `filters: [{ type: "all", values: ["…"] }]`.

## What it does

- Renders a Bootstrap page titled **On Track Books**.
- Requests 20 books per page.
- Shows each book’s title, authors, and publication year.
- Pages with previous, next, and numbered controls from `react-paginate`.
- Writes the page into the path (`/1`, `/2`, …) and prints `Page N of M` under the list.
- Stores the loaded books, page count, and current page in Redux.
- Builds Bootstrap from Sass with `$brand-primary: #1d7874`.

## Stack

| Piece | Version in this repo |
| --- | --- |
| React | 16.6 |
| Create React App (`react-scripts`) | 2.1.3 |
| Redux / react-redux | 4.0 / 6.0 |
| React Router | 4.3 |
| React Bootstrap | 0.32 (Bootstrap 3 components) |
| Bootstrap Sass | 3.3 |
| react-paginate | 6.0 |
| axios | 0.18 |
| Sass compiler | `node-sass-chokidar` 1.3 (`node-sass` 4.10) |

UI code is React 16 class components. There is a single Redux action, `UPDATE_BOOKS`.

## Layout

```
src/
  index.js                  store and root render
  index.scss                Bootstrap entry; sets the primary colour
  axios.js                  API client
  App.js                    header and router
  store/reducer.js          books, pageCount, currentPage
  containers/Books/         pager and page route
  containers/BookList/      fetch and list
  components/Book/          one catalogue row
  components/PageNo/        "Page N of M"
  components/BookFilter/    search field, left unmounted
public/
  index.html                document title is still the Create React App default
  manifest.json             name "On Track Books"
```

`src/index.css` is the stylesheet compiled from `src/index.scss`. `npm start` and `npm run build` regenerate it.

## How it works

`App` renders `Books` on `path="/"`, which matches every URL. On mount, `Books` navigates to `/1` when that match has no `page` param. A nested route, `/:id`, renders `BookList` for the number in the path.

Choosing a page calls `history.push` with `/${n}` (`react-paginate` reports a zero-based index; the path uses the one-based page). `BookList` posts from `componentDidUpdate` when Redux `currentPage` differs from `:id`, and skips the request when the store already holds that page.

```http
POST http://nyx.vima.ekt.gr:3000/api/books
Content-Type: application/json

{
  "page": "<id from the URL>",
  "itemsPerPage": 20,
  "filters": [{ "type": "all", "values": [""] }]
}
```

The handler reads `books` and `count`, sets `pageCount` to `Math.ceil(count / 20)`, and dispatches `UPDATE_BOOKS`. The reducer replaces `books`, `pageCount`, and `currentPage`. The pager’s `forcePage` is `currentPage - 1`.

Each row is a Bootstrap `ListGroupItem`. The header is `book_title`. The body is `Author: … - Year: …`, with `book_author` joined by commas.

## Run it

Use **Node.js 10** and the npm 6 that ships with it. The lockfile is the npm 5–6 format, `node-sass` 4.10 publishes prebuilt binaries through Node 11, and `react-scripts` 2.1 targets that generation of Node. Current Node releases fail while installing or bundling this tree.

```bash
nvm install 10
nvm use 10
npm install
npm start
```

`npm start` compiles Sass and starts the dev server together (`npm-run-all -p watch-css start-js`). Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm start` | Compile Sass, then watch it, in parallel with the Create React App dev server. |
| `npm test` | Open the interactive Create React App test runner. |
| `npm run build` | Compile Sass, then write a production bundle to `build/`. |
| `npm run eject` | Copy the Create React App config into the repo. One-way. |

## API

`src/axios.js` sets `baseURL` to `http://nyx.vima.ekt.gr:3000/api`. Calls go to `/books` on that host.

The client expects JSON with:

- `count` — total matches, parsed as an integer
- `books` — array of records with `id`, `book_title`, `book_author` (array of strings), `book_publication_year`, `book_publication_city`, `book_publication_country`, and `book_pages`

That host did not accept a connection when this README was updated (October 2026). Catalogue data comes only from that service. A failed request has no `.catch`, and the store starts as `books: []`, so the list stays empty while the service is down.

## Notes on the current code

- `BookFilter` is the optional search box: a text field, a Search button, and submit-on-Enter. `Books` leaves it commented out, and every request sends an empty filter string.
- `BookList` passes publication city, country, and page count into `Book`. The row renders title, authors, and year.
- The route on `App` is `path="/"`, which carries no `page` param. `Books` therefore navigates to `/1` on every fresh load, including when the address bar already names another page.
- The catalogue request runs in `BookList.componentDidUpdate`. The first mount waits for a later update before it posts.
- `src/App.test.js` renders `<App />` by itself. `Books` is connected to Redux, so that smoke test needs a `Provider` around `App` before the routed list can render.

## Author

[Wan Yau](https://github.com/WanCodes) — GitHub [@WanCodes](https://github.com/WanCodes).
