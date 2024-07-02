// Using ES6 module export syntax
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path to include all your project files where you're using Tailwind CSS
    "node_modules/flowbite-react/**/*.js", // Include Flowbite components if you're using them
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Include the Flowbite plugin
  ],
};
