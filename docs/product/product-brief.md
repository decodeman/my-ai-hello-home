# Product Brief — Hello Home

## Vision

A minimal mobile-first app that greets a user by name. It exists as a small,
self-contained starter product: the user types their name on one screen and is
shown a personalized greeting on a second screen, with the ability to navigate
back.

## Problem

There is currently no product in this repository. We need a first, working
end-to-end vertical slice — input, navigation, and output — that establishes
the mobile app scaffold and conventions for future features.

## Goals

- Let a user enter their name on a Home screen.
- Show `Hello, {name}!` on a separate Greeting screen.
- Let the user navigate back from the Greeting screen to the Home screen.

## Non-Goals

- No account creation, authentication, or identity.
- No persistence of the name across app restarts.
- No backend API or database — the app is fully client-side.
- No web client (mobile-first, iOS and Android only).

## Target Platform

iOS and Android via React Native + Expo + TypeScript (see
[ADR-0001](../architecture/adr-0001-expo-router-navigation.md) for the
navigation approach).

## Success Criteria

- A user can complete Home → enter name → Greeting → Back to Home without
  errors on iOS and Android (via Expo Go or a simulator/emulator).
- All acceptance criteria in `acceptance-criteria.md` are covered by automated
  tests per `test-strategy.md`.
