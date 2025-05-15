/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tahoma: ['Tahoma', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          green: "#15803d",
          orange: "#ea580c",
          darkgreen: "#1F5C3B",
          waterblue: "#0077B6",
        },
      },
    },
  },
  plugins: [],
};
