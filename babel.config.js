module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          lazyImports: true,
        },
      ],
    ],
    plugins: ["expo-router/babel", "react-native-reanimated/plugin"],
  };
};
