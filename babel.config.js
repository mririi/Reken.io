module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."], //  This says the root of your project folder
          // To make your imports look better
          // Insert your whatever name to make alias for the imports
          // In this example I'm using @components to referring the components folder
          // That located inside src folder.
          // Note: You can make a lot of aliases in here
          alias: {
            "@store": "./src/store",
            "@constants": "./src/constants",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@assets": "./assets",
            "@Auth": "./src/screens/Authentication",
          },
        },
      ],
    ],
  };
};
