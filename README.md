# Loan Calculator

A React Native app built with Expo that lets users calculate loan repayments via two interactive sliders.

## Requirements

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android Emulator (via Android Studio), or a physical device

## Getting started

Install dependencies:

```bash
npm install
```

**Note:** this app uses native modules (`expo-secure-store`, `@react-native-community/slider`) and cannot run in Expo Go. A development build is required.

**Option 1 — pre-built APK (quickest)**

Install this APK on your Android device or emulator:
https://expo.dev/accounts/nuclearwinters/projects/lendable4/builds/c7d47f09-19d1-4f49-b4f1-1d84bec62039

Then start the dev server and press `a`:

```bash
npx expo start
```

**Option 2 — local build**

Follow the [local development build guide](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local), then run:

```bash
npx expo run:android
```

## Running tests

### Unit tests (Jest)

```bash
npm test
```

To run in watch mode:

```bash
npm test -- --watch
```

### End-to-end tests (Maestro)

Maestro tests require the app to be running on a simulator or physical device first.

Install the Maestro CLI if you haven't already:

Follow these instructions to install the Maestro CLI: https://docs.maestro.dev/maestro-cli/how-to-install-maestro-cli

Then, with the app open on a simulator or device, run:

```bash
maestro test .maestro/lendable.yaml
```

The flow launches the app, asserts default values, swipes both sliders to their extremes, verifies the displayed values at each end, and checks that the last slider positions are restored after relaunching.

## Architecture

```
src/
  app/
    _layout.tsx        # Root layout (fonts, splash screen)
    index.tsx          # Main screen — sliders and results
  components/
    AppGradient.tsx    # Background gradient wrapper
    LabelRow.tsx       # Slider label + value row
    StatItem.tsx       # Interest rate / monthly repayment display
    ThemedText.tsx     # Text with theme-aware styles
  constants/
    calculator.ts      # Slider bounds, defaults, storage keys
    theme.ts           # Colours
  hooks/
    use-theme-color.ts # Light/dark colour resolution
  utils/
    calculator.ts      # Pure functions: interest rate, repayment formula, formatters
  __tests__/           # Unit and integration tests
```

The calculator logic lives entirely in `src/utils/calculator.ts` as pure functions, making it straightforward to test independently of the UI. The main screen (`index.tsx`) owns the slider state, derives all display values from it, and persists selections to `expo-secure-store` so the user's last values are restored on next launch.

## Decisions and trade-offs

- **Slider library** — used `@react-native-community/slider` for native feel on both platforms. Good compatibility with Maestro but missing props to modify the horizontal progress line.
- **Term representation** — the term slider uses integer steps (2–10) representing half-year increments internally, then formats them as `1 year`, `1½ years`, etc. for display. This help us create simple calculations during render.
- **Monthly repayment formula** — standard amortisation: `P × (r(1+r)^n) / ((1+r)^n − 1)` where `r` is the monthly rate and `n` is the number of months.
- **Persistence** — `expo-secure-store` is used to save slider values between sessions. `SecureStore.getItem` (synchronous) is called inside the `useState` initialiser to avoid a flash of default values.
- **No navigation** — the exercise calls for a single screen, so `expo-router` is used minimally just as the project's entry point.
