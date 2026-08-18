# Hello Home — Inception

## 1. Verbatim Request

> make a mobile first app that inputs name and echoes back "Hello, {name}!" on a separate sreen, with navigation back to the first.

## 2. Intent

The user wants a first, working mobile app: a minimal, self-contained
starter that takes a name as input and shows a personalized greeting on a
second screen, with a way to navigate back to the first.

## 3. Problem

The repository was empty — there was no product yet. This establishes the
initial product and the mobile app scaffold/conventions for future work.

## 4. Requirements

- Home screen with a name text input.
- Submitting a non-empty (trimmed) name navigates to a Greeting screen.
- Greeting screen displays `Hello, {name}!`.
- Greeting screen provides navigation back to the Home screen.
- Home screen retains the previously entered name after returning via Back.
- Submit is disabled for an empty or whitespace-only name.
- Accessible labels and adequate touch targets on both screens.

Full detail in `docs/product/user-stories.md` and
`docs/product/acceptance-criteria.md`.

## 5. Architecture Impact

New product. Establishes:

- A single Expo/React Native/TypeScript mobile client (no web client).
- Expo Router stack navigation between Home and Greeting (ADR-0001).
- No backend API, database, or identity provider — the app is fully
  client-side; the greeting is computed from on-device input with no data
  to persist.

See `docs/architecture/c4-context.md`, `docs/architecture/c4-container.md`,
and `docs/architecture/adr-0001-expo-router-navigation.md`.

## 6. Decisions

- **Stack:** React Native + Expo + TypeScript (default technical
  direction), no backend (not needed for this feature).
- **Navigation:** Expo Router (ADR-0001).
- **Visual fidelity:** low-fidelity UX artifacts only — the user declined
  high-fidelity mockups/prototype when asked, per the required Visual
  Fidelity Decision.
- **End-to-end testing:** not included. This is a native mobile-only app;
  Playwright cannot exercise it, so per the command's native-mobile
  guidance the question was not asked and Playwright was not planned. A
  native E2E tool (e.g. Detox or Maestro) can be added later if requested.
- **Test approach:** red-green-refactor TDD with Jest + React Native
  Testing Library, 100% coverage gate on application source in CI. See
  `docs/product/test-strategy.md`.

## 7. Alternatives Considered

- **Manual React Navigation setup instead of Expo Router** — more
  boilerplate for no benefit at this size (see ADR-0001).
- **Single screen with conditional rendering instead of real navigation** —
  rejected; the request explicitly asks for a separate screen and back
  navigation, which this would not provide.
- **Persisting the name (e.g. AsyncStorage) across app restarts** — not
  requested and out of scope; Home retaining the name only within the
  current navigation stack (via Back) satisfies the requirement without
  adding persistence.

## 8. Artifacts Created

- `docs/product/product-brief.md`
- `docs/product/user-stories.md`
- `docs/product/acceptance-criteria.md`
- `docs/product/test-strategy.md`
- `docs/ux/user-flow.md`
- `docs/ux/screen-inventory.md`
- `docs/ux/low-fidelity-wireframes.md`
- `docs/architecture/c4-context.md`
- `docs/architecture/c4-container.md`
- `docs/architecture/adr-0001-expo-router-navigation.md`
- `docs/product-history/2026-08-18-inception/history.md` (this file)

## Implementation Summary

_Pending approval. To be appended by `/software-foundry:continue-work` (or
this command, if approved in the same session) after implementation._

## Validation Results

_Pending approval. To be appended after tests are run and the coverage gate
is verified._
