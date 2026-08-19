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

Approved and implemented in the same session.

- Scaffolded an Expo + TypeScript app (`npx create-expo-app`) and added
  Expo Router with its required peers (`react-native-safe-area-context`,
  `react-native-screens`, `expo-linking`, `expo-constants`) per ADR-0001.
  Replaced the default `App.tsx`/`index.ts` entry with `expo-router/entry`.
- Built via red-green-refactor TDD:
  - `app/__tests__/index.test.tsx` — Home screen: renders the name field
    and a disabled submit for empty/whitespace input, enables submit and
    navigates with the trimmed name for valid input, and asserts a 44pt
    minimum touch target.
  - `app/__tests__/greeting.test.tsx` — Greeting screen: renders
    `Hello, {name}!` from the route param, Back invokes `router.back()`,
    and asserts a 44pt minimum touch target.
  - `app/__tests__/navigation.test.tsx` — integration test using
    `expo-router/testing-library`'s `renderRouter`: submit a name on
    Home, see the Greeting screen, tap Back, and confirm the Home name
    field still shows the submitted value.
  - Implementation: `app/_layout.tsx` (Expo Router stack), `app/index.tsx`
    (Home), `app/greeting.tsx` (Greeting).
- Dropped a redundant runtime guard in `Home`'s submit handler once tests
  showed it was unreachable (the disabled button already prevents
  submission of an invalid name), keeping 100% branch coverage without
  dead code.
- Added a required CI workflow (`.github/workflows/ci.yml`): install,
  `tsc --noEmit`, then `jest --coverage` with the 100% coverage thresholds
  configured in `package.json`.

### Toolchain fixes discovered during setup

The scaffolded dependency versions did not agree with each other out of
the box; each was resolved by pinning to the version its consumer actually
expected, not by disabling checks:

- `jest@30` is incompatible with `jest-expo@57`'s bundled Jest 29
  environment packages (`jest-mock@29` lacks a method `jest-runtime@30`
  calls) — pinned `jest` to `^29.7.0`.
- `jest-expo` needs `@react-native/jest-preset` as a peer, and its version
  must track the installed `react-native` release (`0.86.2`), not
  whatever `npm install` resolves as latest (`0.87.0`) — pinned to
  `0.86.2`.
- `expo-router@57.0.14`'s bundled `renderRouter` test helper predates
  `@testing-library/react-native@14`'s move to an async `render()` (backed
  by a separate `test-renderer` package) — downgraded RNTL to `^13.3.0`,
  matching expo-router's own devDependency, which restored the synchronous
  `render()` the helper expects.
- RNTL 13.3.3 requires `react-test-renderer`'s version to match `react`
  exactly — pinned to `19.2.3`.

## Validation Results

- `npx jest` — 3 suites, 8 tests, all passing.
- `npx jest --coverage` — 100% statements, branches, functions, and lines
  across `app/_layout.tsx`, `app/index.tsx`, and `app/greeting.tsx`; the
  configured `coverageThreshold` gate passes.
- `npx tsc --noEmit` — no type errors.
- Not yet validated: a manual run in Expo Go / a simulator (no device or
  simulator available in this environment). Recommended before merging or
  as a follow-up validation step.

### Correction: Expo Go SDK compatibility (post-approval, pre-merge)

The user tried the app in Expo Go on Android and it hung. Root cause: the
initial scaffold used `npx create-expo-app@latest`, which installed Expo
SDK 57 without checking it against Expo Go's supported SDK version first.
The `react-native` skill's "Expo SDK Compatibility" step exists precisely
to catch this — determine the Expo Go-supported SDK and confirm with the
user before scaffolding — and it was skipped in the original
implementation pass.

Fix: downgraded the project to Expo SDK 54.0.37 (the version the user's
Expo Go install supports), via `npm install expo@54.0.37` followed by
`npx expo install --fix` to realign all Expo/React Native dependencies
(`expo-router`, `expo-constants`, `expo-linking`, `expo-status-bar`,
`react`, `react-native`, `react-native-safe-area-context`,
`react-native-screens`) and their dev-tooling counterparts (`jest-expo`,
`babel-preset-expo`, `react-test-renderer`, `@types/react`,
`@types/jest`, `typescript`) to the versions SDK 54 expects. Removed the
now-unneeded `@react-native/jest-preset` devDependency (only required by
the SDK 57-era `jest-expo`). Full test suite (8 tests), 100% coverage, and
`tsc --noEmit` all re-verified green on SDK 54.

### Correction: invalid config plugin entry (post-downgrade)

Running `npx expo start` after the SDK 54 downgrade crashed immediately:
`PluginError: Unable to resolve a valid config plugin for expo-status-bar`.
The earlier `expo install --fix` run (during the SDK downgrade) had added
`"expo-status-bar"` to `app.json`'s `plugins` array, but that package has
no config plugin (no `app.plugin.js`) — it needs no plugin entry at all.
Removed it, leaving `"plugins": ["expo-router"]`. Verified with
`npx expo config --type public` (resolves cleanly, `sdkVersion: '54.0.0'`)
and re-ran the full test suite (still 8/8 passing, 100% coverage).
