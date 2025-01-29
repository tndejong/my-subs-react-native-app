/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0EA5E9';  // Sky Blue
const tintColorDark = '#38BDF8';   // Light Blue

export const Colors = {
  light: {
    primary: '#0EA5E9',    // Sky Blue
    secondary: '#38BDF8',  // Light Blue
    accent: '#7DD3FC',     // Lighter Blue
    background: '#000000', // Black
    text: '#FFFFFF',      // White
    success: '#22C55E',   // Green
    error: '#F43F5E',     // Pink-Red
    tint: tintColorLight,
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#38BDF8',    // Light Blue
    secondary: '#7DD3FC',  // Lighter Blue
    accent: '#0EA5E9',     // Sky Blue
    background: '#000000', // Black
    text: '#FFFFFF',      // White
    success: '#22C55E',   // Green
    error: '#F43F5E',     // Pink-Red
    tint: tintColorDark,
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,
  },
};
