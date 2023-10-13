/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "border-color": "bg-slate-300",
      },
    },
  },
  plugins: [],
};
