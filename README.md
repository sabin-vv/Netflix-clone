# Netflix Clone (React + Vite)

A Netflix-style experience powered by TMDB for catalog data and Firebase for auth and watchlists. Users can sign up, browse curated rows, open detailed pages with recommendations, and watch trailers via YouTube embeds.

## Features

- Email/password auth with Firebase; session-aware navigation and protected routes
- Rows for Now Playing, Popular, Top Rated, and Upcoming titles from TMDB
- Detail pages with synopsis, genres, production info, similar titles, and save/remove watchlist actions
- Trailer playback via embedded YouTube player
- Persistent watchlist stored in Firestore
- Ready-to-deploy static build with GitHub Pages script

## Tech Stack

- React 19, Vite, React Router
- Firebase Auth + Firestore
- TMDB API (bearer token auth)
- Axios, React YouTube, React Hot Toast

## Project Structure (key parts)

- [src/Pages/Home/Home.jsx](src/Pages/Home/Home.jsx) – hero banner, category rows, protected route redirect
- [src/Pages/MovieInfo/MovieInfo.jsx](src/Pages/MovieInfo/MovieInfo.jsx) – details, similar titles, watchlist toggle, play CTA
- [src/Components/Player/Player.jsx](src/Components/Player/Player.jsx) – trailer playback from TMDB video keys
- [src/Pages/Watchlist/Watchlist.jsx](src/Pages/Watchlist/Watchlist.jsx) – saved titles grid with remove actions
- [src/Context/AuthContext.jsx](src/Context/AuthContext.jsx) – auth state, watchlist helpers, provider wrapper
- [src/db/Firebase.js](src/db/Firebase.js) – Firebase initialization (replace with your project keys)
- [src/Api/tmdb.js](src/Api/tmdb.js) – TMDB axios instance with bearer token

## Prerequisites

- Node.js 18+ and npm
- TMDB account with a Read Access Token (v4)
- Firebase project (Auth + Firestore enabled)

## Environment

Create a `.env` (or `.env.local`) in the project root:

```
VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

Update [src/db/Firebase.js](src/db/Firebase.js) with your Firebase credentials. Do not commit real secrets in production.

## Run the app locally

1. Install deps: `npm install`
2. Start dev server: `npm run dev`
3. Open the shown URL (defaults to http://localhost:5173)

## Available scripts

- `npm run dev` – start Vite dev server
- `npm run build` – production build to `dist`
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint
- `npm run deploy` – publish `dist` to GitHub Pages (uses `homepage` from package.json)

## Usage notes

- New visitors are redirected to Login; sign up or log in to access home, details, player, and watchlist
- Add/remove titles to My List from the detail page; changes persist via Firestore
- Use the Play button to open the trailer player (falls back to the first available trailer type)

## API and data

- TMDB base URL: https://api.themoviedb.org/3/movie
- Images: `${VITE_IMAGE_BASE_URL}/w300|w500|original/<path>`
- Auth header: `Authorization: Bearer ${VITE_TMDB_READ_ACCESS_TOKEN}`

## Deployment

1. Ensure `.env` is set with your TMDB token and image base URL
2. `npm run deploy` to build and push `dist` to the `gh-pages` branch
3. Confirm `homepage` in package.json matches your GitHub Pages URL

## Future improvements

- Add search and genre filters
- Add profile avatars and multiple profiles
- Add offline-friendly caching for hero and row data
