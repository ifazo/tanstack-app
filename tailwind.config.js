/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    "@tailwindcss/typography",
    "@tailwindcss/forms",
    "@tailwindcss/aspect-ratio",
  ],
};
