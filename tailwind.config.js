

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        synthwave: {
          ...require("daisyui/src/theming/themes")["synthwave"],
          "*": {
            "color": "white",
            
          },
          
        },
      },
      {
        emerald: {
          ...require("daisyui/src/theming/themes")["emerald"],
          "*": {
            "color": "black",
            
          },
          
        },
      },
      "emerald",
      "synthwave"
    ],
  },
};
