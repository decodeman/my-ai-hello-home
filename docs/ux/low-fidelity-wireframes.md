# Low-Fidelity Wireframes — Hello Home

Plain-text structural wireframes. Mobile portrait, single-column, thumb-reach
controls near the bottom.

## Home Screen

```
┌─────────────────────────────┐
│  Hello Home                 │  <- header/title
│                              │
│  Your name                  │  <- field label
│  ┌────────────────────────┐ │
│  │ Type your name…        │ │  <- text input
│  └────────────────────────┘ │
│                              │
│                              │
│  ┌────────────────────────┐ │
│  │      Say Hello          │ │  <- primary button
│  │   (disabled if empty)   │ │
│  └────────────────────────┘ │
└─────────────────────────────┘
```

- Text input: `accessibilityLabel="Your name"`, autofocus on screen load.
- Button: `accessibilityRole="button"`, disabled state visually distinct
  (reduced opacity) and `accessibilityState={{ disabled: true }}` when the
  trimmed name is empty.

## Greeting Screen

```
┌─────────────────────────────┐
│  ← Back                     │  <- header back control
│                              │
│                              │
│                              │
│        Hello, Ava!          │  <- greeting text, large/centered
│                              │
│                              │
│  ┌────────────────────────┐ │
│  │        Back              │ │  <- explicit in-body back button
│  └────────────────────────┘ │
└─────────────────────────────┘
```

- Greeting text: single line, large type size, centered, `accessibilityRole="header"`.
- Both the header back control and the in-body "Back" button return to Home
  with the name field still populated (AC-5).

## Mobile Navigation

- Stack navigation (Expo Router), Home as the initial route, Greeting pushed
  on top. Back uses standard stack-pop behavior (header chevron, OS back
  gesture/button on Android, and the explicit Back button all pop the same
  way).
