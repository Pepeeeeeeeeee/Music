# Music

Ionic/Vue mobile frontend for a personal music-player app — pairs with the
[`MusicAppBackend`](https://github.com/Pepeeeeeeeeee/MusicAppBackend) ASP.NET backend. Built as
part of the same secondary-school graduation project (SPŠE Bratislava).

## What it does

- **Auth** — login, register, forgot/reset password (`loginPage.vue`, `register.vue`,
  `forgot.vue`, `reset.vue`, `zmenaHesla.vue`).
- **Home** — last-played tracks and your playlists (`MainPage.vue`).
- **Search** — searches YouTube directly via the Data API v3 (`SearchPage.vue`), independent of
  the backend.
- **Player, playlists, favorites** — `Player.vue`, `PlayListPage.vue`, `PlayListsPage.vue`,
  `FavoritesPage.vue`, talking to the backend's `Player` endpoints to persist playlists/favorites
  and to resolve/download tracks.
- Account/settings pages (`MojUcet.vue`, `settingPage.vue`).

Built for Android and iOS via Capacitor, on top of a Vue 3 + Ionic web app.

## Stack

Vue 3, Ionic Vue 6, Vue Router, Axios, Chart.js (`vue-chartjs`), TypeScript, Vite, Capacitor 4
(Android + iOS platforms checked in).

## Running it

```bash
npm i
npm run dev        # web
npm run build:native   # web build + cap sync for Android/iOS
```

The backend is expected at `http://localhost:26623` (hardcoded in several views, matching
`BackendMusic`'s default IIS Express port) — no `.env`/config layer for that yet.
