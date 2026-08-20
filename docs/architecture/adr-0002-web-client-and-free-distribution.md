# ADR-0002: Add a web client; distribute via free channels only

## Status

Accepted

## Context

ADR-0001 established a mobile-only client (no web) as part of the product's
initial architecture. Separately, the app had never been distributed beyond
the developer's own Expo Go session — there was no path for anyone else
(beta testers, colleagues, investors) to run it.

The user wants to demo the app to close friends, colleagues, and potential
investors before committing any money to the product. React Native + Expo
already supports a web target via `react-native-web`, making a web client
comparatively cheap to add on top of the existing mobile-first stack (unlike
adding mobile support to a web-first app, which is the harder direction).

Distribution options differ sharply in cost:

- Android: a sideloadable `.apk` built via EAS's free tier costs nothing —
  no Play Console account required.
- Web: a static export hosted on GitHub Pages costs nothing and needs no
  new third-party account (the repo is already on GitHub).
- iOS: any real-device distribution (TestFlight, ad-hoc, or App Store)
  requires an active Apple Developer Program membership — a mandatory
  $99/year, imposed by Apple, not avoidable via tooling choices.

## Decision

- Add a web client (`expo.web.output: "static"`, `expo.experiments.baseUrl:
  "/my-ai-hello-home"`) alongside the existing mobile client, using
  `react-native-web` — no new UI work required since the existing screens
  are plain React Native components with no native-only APIs.
- Distribute the web build via GitHub Pages, deployed automatically on push
  to `main` via GitHub Actions (`actions/deploy-pages`).
- Distribute Android via an EAS `preview` build profile (`eas.json`)
  producing a sideloadable APK on EAS's free tier.
- Do **not** set up iOS distribution (no Apple Developer account, no iOS EAS
  profile) until the user is ready to pay for it. iOS testers can use the
  web build in the meantime — it is not native, but it costs nothing and
  requires no app install.

## Alternatives Considered

- **Vercel/Netlify for web hosting** — also free, but requires creating a
  new third-party account; GitHub Pages needs none since the repo is
  already on GitHub, and requires no new account.
- **Railway for web hosting** (the default Foundry hosting choice) —
  Railway's default direction is for backend APIs; this is a static export
  with no server, so a static host is a better fit and avoids Railway's
  cost entirely.
- **Google Play internal testing track** ($25 one-time) instead of
  sideloading — rejected for now since sideloading a `.apk` directly to a
  small group of friends/colleagues is free and sufficient at this stage;
  can be added later without changing the build itself.
- **Paying for Apple Developer Program now** — rejected per explicit user
  instruction: no money spent until the idea is demonstrated and validated
  on the free channels first.

## Consequences

- `react-dom`, `react-native-web`, and `@expo/metro-runtime` are added as
  dependencies.
- The app now has two free distribution channels (Android APK, web) and one
  deliberately deferred paid channel (iOS), which must be explicitly
  approved (and paid for) before any iOS distribution work begins.
- `eas.json` defines `preview` (Android APK) and `production` (Android
  app-bundle, for a future Play Store submission) profiles; no `ios` key is
  present in either, by design.
- CI gains a `deploy-web.yml` workflow, separate from the existing test/
  coverage gate in `ci.yml`.
