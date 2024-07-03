/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        slide: "url('public/ifgb/slide.jpg')",
      },
      colors: {
        pinkred: "#F8395A",
        blue: "#24355A",
        lightgrey: "#F7F8F8",
        grey: "#bdb9b9",
        darkgrey: "#969393",
      },
      boxShadow: {
        custom: "0 3px 10px 2px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        10: "10px",
      },
      fontSize: {
        20: "20px",
      },
      padding: {
        10: "10px",
        15: "15px",
      },
    },
  },
};
