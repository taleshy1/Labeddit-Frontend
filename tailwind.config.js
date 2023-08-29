/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        gray: {
          100: "#f7fafc",
          200: "#EDEDED",
          900: "#1a202c",
          border: "#D5D8DE",
        },
        orange: "#FE7E02",
      },
      fontFamily: {
        sans: ['"Noto Sans"'],
        ibm: ['"IBM Plex Sans"'],
      },
      gradientColorStops: {},
    },
  },
};
