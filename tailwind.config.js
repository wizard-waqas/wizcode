module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      "blue": "#3B66FF",
      "gold": "#FFD43B",
      "darkgold": "#D0AE33",
      "darkblue": "#1C223C",
      "darkgrey": "#161515",
      "lightgrey": "#D8E0FF"
    },
    fontFamily: {
        "fredoka": ["Fredoka One"],
        "open": ["Open Sans"]
    },
    extend: {
      dropShadow: {
        "xl": "-20px 20px 0 rgba(28, 34, 60, 1)",
        "lg": '0 0 20px rgba(255, 212, 59, 0.5)',
      },
    }
  },
  plugins: [],
}
