import { Font } from 'expo';

export const cachedFonts = fonts =>
  fonts.map(font => Font.loadAsync(font));

export const fontAssets = cachedFonts([
  {
    sansBold: require('../assets/fonts/PT_Sans-Web-Bold.ttf')
  },
  {
    sansBoldItalic: require('../assets/fonts/PT_Sans-Web-BoldItalic.ttf')
  }
]);
