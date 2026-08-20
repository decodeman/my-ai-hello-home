# Web client and free-tier distribution

## 1. Intent

Make the app reachable by people other than the developer — close friends,
colleagues, and potential investors — as a beta/demo, without spending any
money until the idea is validated. Also add a web client, since it is
comparatively cheap to add on top of the existing mobile-first Expo stack.

## 2. Problem

Since inception, the app only ran in the developer's own Expo Go session.
There was no way for anyone else to try it, and no web target existed.

## 3. Requirements

- A web build of the app, deployed somewhere reachable by a URL, at no
  monetary cost.
- An Android build other people can install directly (sideload), at no
  monetary cost.
- No iOS distribution work (Apple Developer Program is a real, unavoidable
  $99/year cost) until the user explicitly decides to pay for it.
- Existing test suite, coverage gate, and type-check must remain green.

## 4. Architecture Impact

Adds a web client alongside the existing mobile client (`react-native-web`,
static export) and two distribution pipelines (GitHub Pages for web, EAS
Build for Android). See `docs/architecture/adr-0002-web-client-and-free-distribution.md`
for the full decision record, including why iOS is explicitly deferred.

## 5. Decisions

- Web client via `react-native-web`, static export (`expo.web.output:
  "static"`), hosted on GitHub Pages (free, no new account) rather than
  Vercel/Netlify (free, but a new account) or Railway (the Foundry default
  for backend hosting, not a fit for a static export with no server).
- `expo.experiments.baseUrl` set to `/my-ai-hello-home` so exported asset
  paths resolve correctly under GitHub Pages' project-site subpath —
  verified by inspecting the exported `dist/index.html` before wiring up
  deployment.
- Android distribution via an EAS `preview` build profile producing a
  sideloadable `.apk` on EAS's free tier — no Play Console account.
- iOS distribution deliberately not set up (no `ios` key in `eas.json`, no
  Apple Developer account) — this is the one channel with a real cost, and
  the user wants to defer any spend until the app is validated on the free
  channels first.

## 6. Alternatives Considered

See `docs/architecture/adr-0002-web-client-and-free-distribution.md`
("Alternatives Considered").

## 7. Implementation Summary

- Installed `react-dom`, `react-native-web`, `@expo/metro-runtime` via
  `npx expo install` (SDK-54-compatible versions).
- Set `expo.web.output: "static"` and `expo.experiments.baseUrl:
  "/my-ai-hello-home"` in `app.json`.
- Verified locally with `npx expo export --platform web`: 4 static routes
  generated (`/`, `/greeting`, `/_sitemap`, `/+not-found`); confirmed
  exported `dist/index.html` references assets under
  `/my-ai-hello-home/...` as expected for a GitHub Pages project site.
- Re-ran the full test suite and type-check after adding the web
  dependencies — no regressions.
- Added `eas.json` with `preview` (Android APK, internal distribution) and
  `production` (Android app-bundle) build profiles. No iOS profile.
- Added `.github/workflows/deploy-web.yml`: on push to `main`, exports the
  static web build and deploys it to GitHub Pages via
  `actions/upload-pages-artifact` + `actions/deploy-pages`.
- Added `docs/architecture/adr-0002-web-client-and-free-distribution.md`.

### Manual steps still required (cannot be done from this environment)

- **Enable GitHub Pages** for the repo with source set to "GitHub Actions"
  (Settings → Pages → Build and deployment → Source). The `gh` token
  available in this session lacks the Pages-admin permission needed to do
  this via API (`403 Resource not accessible by personal access token`).
  Until this is done, `deploy-web.yml` will run but the Pages deployment
  step will fail.
- **`eas login`** — no Expo/EAS credentials are available in this
  environment. Once logged in, run `eas build:configure` (links the project
  to an EAS project ID) and then `eas build --platform android --profile
  preview` to produce the first sideloadable APK.

## 8. Validation Results

- `npx jest --coverage` — 3 suites, 8 tests, all passing; 100% statements,
  branches, functions, and lines (unchanged from inception — no new
  application source was needed for the web target).
- `npx tsc --noEmit` — no type errors.
- `npx expo export --platform web` — succeeds locally; static output
  verified to contain correctly base-path-prefixed asset references.
- Not yet validated: an actual GitHub Pages deployment (blocked on the
  manual Pages-enable step above) and an actual EAS Android build (blocked
  on `eas login`). Both are recommended as the next validation step once
  the user completes the manual handoff items.
