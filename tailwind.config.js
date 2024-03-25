/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: "2rem",
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      bolder: "700",
      extrabold: "800",
      black: "900",
    },
    extend: {
      backgroundImage: {
        login:
          "url('http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_blue.s2014.png')",
      },
      fontFamily: {
        sofia: ["Sofia", "sans-serif"],
      },
      fontWeight: {
        bolder: "700",
        extrabold: "800",
      },
      fontSize: {
        xxxs: "0.688rem", // 11px
        xxs: "0.75rem", // 12px
        xs: "0.813rem", // 13px
        "xs-1": "0.834375rem", // 13.35px
        sm: "0.875rem", // 14px
        "sm-1": "0.906rem", // 14.5px
        base: "0.938rem", // 15px
        md: "1rem", // 16px
        "md-1": "1.0625rem", // 17px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.313rem", // 21px
        "2xl-2": "1.358rem", // 21.73px
        "2xl-3": "1.375rem", // 22px
        "2xl-4": "1.53125rem", // 24.5px
        "3xl": "1.688rem", // 27px
        "3xl-1": "2.037rem", // 32.59px
        "3xl-2": "2.0625rem", // 33px
        "4xl": "2.531rem", // 40.5px
        "4xl-1": "2.563rem", // 41px
      },
      colors: {
        primary: "#0D002B",
        primaryLighter: "#0D002B19",
        accent: "#AEAEFD",
        fadeBerry: "#465D6E",
        secondary: "#DD9DFF",
        "secondary-faded": "#DD9DFF17",
        inactive: "#F7F7F8",
        active: "#5BED98",
        cream: "#FFF5E4",
        activeLight: "#AEFDCC",
        ash: "#0D002B33",
        grey: "#EDEDF0",
        danger: "#FF9D9D",
        "danger-dark": "#B72727",
        "danger-dark-xl": "#ED5B5B",
        granite: "#F4F7F9",
        peacock: "#6868EB",
        loginCream: "#FCE5F5",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
      opacity: {
        9: "0.09",
      },
      height: {
        fill: "fill-available",
        fill: "-webkit-fill-available",
        fill: "-moz-available",
      },
      width: {
        fill: "fill-available",
        fill: "-webkit-fill-available",
      },
      borderRadius: {
        "4xl": "28px",
        extraLarge: "25px",
        large: "20px",
        medium: "15px",
        small: "13px",
        smaller: "10px",
        tiny: "6px",
      },
      boxShadow: {
        normal: "0px 0px 10px 2px #DD9DFFA7",
        button: "0px 5px 56px #DD9DFFA7",
        buttonSecondary: "0px 5px 26px #DD9DFFA7",
        sideNavBtn: "0px 15px 36px #DD9DFF6E",
        loginQrBtn: "0px 8px 30px #DD9DFFA7;",
        input: "0px 3px 10px #0D002B1A",
        label: "0px 5px 16px #0D002B0D",
        menu: "0px 7px 10px #0E233338",
        notification: "0px 10px 20px #0E233338",
        sideMenu: "0px 13px 26px #465D6E10",
        whiteCard: "0px 3px 30px #0D002B0D",
        expandBtn: "0px 5px 10px #0D002B1A",
        calendar: "0px 3px 36px #00000029",
      },
      dropShadow: {
        actionText: " 0px 2px 7px #0D002B41",
      },
    },
  },
  plugins: [],
};
