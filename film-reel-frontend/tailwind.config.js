/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        "app-gray": "#212529",
      },
      boxShadow: {
        light: "2px 2px 10px rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};