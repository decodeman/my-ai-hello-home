# Test Strategy — Hello Home

## Tools

- **Jest** — test runner, assertions, coverage collection.
- **React Native Testing Library (`@testing-library/react-native`)** —
  component rendering and interaction (typing, tapping, querying by
  accessible role/label).
- **TypeScript** — compiled with strict mode; type errors fail CI.
- **End-to-end**: not included. This is a native mobile-only app (React
  Native + Expo). Playwright drives browsers and cannot exercise a native
  app, so it is not applicable here. If native end-to-end coverage is
  wanted later (e.g. Detox or Maestro driving a real simulator/emulator),
  that can be added in a future enhancement on request.

## Process

Red-green-refactor for every behavior:

1. Write a failing test expressing the acceptance criterion.
2. Implement the smallest change to pass it.
3. Refactor only while the full suite is green.

No production code is written before its failing test exists.

## Acceptance Criteria → Test Mapping

| AC | Behavior | Test(s) | Layer |
|----|----------|---------|-------|
| AC-1 | Valid name submits and greeting shows "Hello, {name}!" | `HomeScreen` test: typing a name enables submit and navigates with the name param; `GreetingScreen` test: renders `Hello, {name}!` for a given route param | Component |
| AC-2 | Submit disabled for blank/whitespace-only name | `HomeScreen` test: submit button `disabled` prop is `true` when field is empty or all-whitespace | Component |
| AC-3 | Whitespace trimmed before greeting | `HomeScreen`/navigation test: submitting "  Ava  " passes trimmed `"Ava"` as the route param; `GreetingScreen` test: renders `Hello, Ava!` (no extra spaces) | Component / unit |
| AC-4 | Back control returns to Home | `GreetingScreen` test: tapping "Back" invokes `navigation.goBack` (mocked) | Component |
| AC-5 | Home retains name after Back | Navigation integration test: Home → submit → Greeting → Back → name field still shows "Ava" | Integration (React Navigation/Expo Router test harness) |
| AC-6 | Accessible labels and touch targets | Component tests query controls by `accessibilityRole`/`accessibilityLabel`; a lint/style assertion (or manual check recorded in validation results) confirms 44x44 pt minimum | Component / manual |

## Coverage Gate

CI must fail the pull request unless application source under `app/` and
`src/` (or equivalent implementation directories, once created) reaches
**100%** statements, branches, functions, and lines coverage.

Allowed exclusions, explicitly configured in the Jest coverage config, and
only these:

- test files (`*.test.ts(x)`, `__tests__/**`)
- generated code (e.g. Expo Router's generated types)
- type declaration files (`*.d.ts`)
- build/config files (`app.json`, `babel.config.js`, `metro.config.js`,
  `jest.config.js`, etc.)

No threshold may be lowered and no exclusion may be added merely to make a
pull request pass.

## CI

A required GitHub Actions check runs on every pull request:

1. Install dependencies.
2. Type-check (`tsc --noEmit`).
3. Run the full Jest suite with coverage.
4. Fail the check if any test fails or coverage is below 100% on any of the
   four coverage dimensions for application source.
