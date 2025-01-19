/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "home-banner": 'url("/imgs/bg-home-banner.webp")',
        "offers-banner": 'url("/imgs/bg-offers-banner.webp")',
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        inter: ["Inter", "sans-serif"],
        nokora: ["Nokora", "sans-serif"],
      },
      colors: {
        emeraldGreen: {
          50: "#E8F8F2",
          100: "#C5ECDE",
          200: "#9EE0C9",
          300: "#76D4B3",
          400: "#4FC99E",
          500: "#2EB086", // Default
          600: "#239067",
          700: "#1A704E",
          800: "#115037",
          900: "#0A3020",
        },
        darkSlate: {
          50: "#E5E6E9",
          100: "#BFC3CA",
          200: "#989FAB",
          300: "#727C8D",
          400: "#4C596E",
          500: "#313552", // Default
          600: "#292C45",
          700: "#202338",
          800: "#171A2B",
          900: "#0F111E",
        },
        crimsonRose: {
          50: "#FBE6EB",
          100: "#F6C3CF",
          200: "#F09FAF",
          300: "#EA7B8F",
          400: "#E55870",
          500: "#B8405E", // Default
          600: "#94334B",
          700: "#702638",
          800: "#4C1925",
          900: "#270D12",
        },
        softCream: {
          50: "#FFFFFF",
          100: "#FEFBF5",
          200: "#FBF5E4",
          300: "#F8EFD4",
          400: "#F5E8C3",
          500: "#EEE6CE", // Default
          600: "#D1C7B0",
          700: "#B3A891",
          800: "#968973",
          900: "#796B55",
        },
      },
      fontSize: {
        "smH": "1.25rem", // Add a custom class for 20px font size
      },
    },
    plugins: [
      plugin(function ({ addUtilities }) {
        addUtilities({
          ".text-stroke": {
            "-webkit-text-stroke": "2px black",
            color: "transparent",
          },
          ".text-stroke-white": {
            "-webkit-text-stroke": "2px white",
            color: "transparent",
          },
          ".text-stroke-red": {
            "-webkit-text-stroke": "2px red",
            color: "transparent",
          },
          ".text-outline-shadow": {
            "text-shadow":
              "-2px -2px 0 black,2px -2px 0 black,-2px 2px 0 black,2px 2px 0 black",
          },
        });
      }),
    ],
  },
};
