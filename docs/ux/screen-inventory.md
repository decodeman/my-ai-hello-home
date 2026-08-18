# Screen Inventory — Hello Home

## Home Screen (`app/index.tsx`)

- **Purpose:** capture the user's name.
- **Primary action:** tap "Say Hello" to navigate to the Greeting screen.
- **Required data:** none on entry; produces one string (`name`) on submit.
- **States:**
  - Empty — name field blank, "Say Hello" disabled.
  - Filled (invalid) — whitespace-only, "Say Hello" disabled.
  - Filled (valid) — non-empty trimmed name, "Say Hello" enabled.
  - Returned-to — after Back navigation, retains the last submitted name.
- **Navigation:**
  - Entry: app launch (initial route).
  - Exit: → Greeting screen, passing `name` as a route param.

## Greeting Screen (`app/greeting.tsx`)

- **Purpose:** display the personalized greeting.
- **Primary action:** tap "Back" to return to the Home screen.
- **Required data:** `name` route param (string, trimmed, non-empty).
- **States:**
  - Loaded — always renders immediately; no async data, so no
    loading/error state exists.
- **Navigation:**
  - Entry: from Home screen only, via submit.
  - Exit: → Home screen, via Back (device back gesture/button, header back
    control, and an explicit "Back" button all supported).
