# ADR-0001: Use Expo Router for navigation

## Status

Accepted

## Context

The app needs to move between two screens (Home and Greeting) and pass a
`name` value between them, with back navigation to Home. The default
technical direction specifies React Native + Expo + TypeScript but does not
pin a specific navigation library.

## Decision

Use **Expo Router** (file-based routing, built on React Navigation) for the
Home ↔ Greeting stack. Routes live under `app/`: `app/index.tsx` (Home) and
`app/greeting.tsx` (Greeting). The name is passed as a route param on push
and read back on Home when the stack pops.

## Alternatives Considered

- **React Navigation configured manually** (`@react-navigation/native-stack`
  without Expo Router) — more boilerplate (manual navigator/screen
  registration) for no benefit at this app's size; Expo Router wraps the
  same native-stack primitives with file-based routing, which is the
  current standard for new Expo apps.
- **Single-screen with conditional rendering** (no real navigation, just a
  boolean toggle) — rejected because the product intent explicitly asks for
  a separate screen with navigation back, and this would not exercise or
  establish real stack-navigation conventions for future features.

## Consequences

- Adds `expo-router` and its peer dependencies (`react-navigation` family)
  to the project.
- Screens are defined by file location under `app/`, which future features
  should follow for consistency.
- Back behavior (header back control, OS back gesture/button, explicit Back
  button) comes largely for free from the native-stack navigator.
