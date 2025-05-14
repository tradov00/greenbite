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
          green: "#3EB489",         // example shade of green
          orange: "#FFA500",        // standard orange
          darkgreen: "#256D4A",     // optional deeper green
        },
      },
    },
  },
  plugins: [],
};
