import withMT from "@material-tailwind/react/utils/withMT";
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat Alternates", "sans-serif"],
      },
      backgroundImage: {
        banner: ["./public/image/service-detail-03.jpg"]
      }
    }
  },
  plugins: [],
});