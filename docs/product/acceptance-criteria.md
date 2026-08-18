# Acceptance Criteria — Hello Home

## AC-1 (US-1, US-2): Submitting a valid name shows the greeting

Given the Home screen is displayed,
when the user types a non-empty name (e.g. "Ava") into the name field and
taps "Say Hello",
then the app navigates to the Greeting screen and displays "Hello, Ava!".

## AC-2 (US-4): The submit action is unavailable for a blank name

Given the Home screen is displayed and the name field is empty or contains
only whitespace,
then the "Say Hello" button is disabled and cannot be activated.

## AC-3 (US-4): Whitespace is trimmed before greeting

Given the Home screen is displayed,
when the user types "  Ava  " (leading/trailing whitespace) and taps
"Say Hello",
then the Greeting screen displays "Hello, Ava!" (trimmed, no extra spaces).

## AC-4 (US-3): Back navigation returns to Home

Given the Greeting screen is displayed,
when the user taps the "Back" control,
then the app navigates back to the Home screen.

## AC-5 (US-3): Home retains the previously entered name after Back

Given the user submitted "Ava" and navigated to the Greeting screen,
when the user taps "Back",
then the Home screen is shown with "Ava" still present in the name field.

## AC-6 (Accessibility): Screens are usable with assistive technology

Given either screen is displayed,
then the name field, submit button, and back control each expose an
accessible label and meet minimum touch target size (44x44 pt).
