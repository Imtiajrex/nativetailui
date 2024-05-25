module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
      'react-native-iconify/plugin',
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
            '.lottie',
            '.png',
            '.svg',
            '.jpg',
            '.env',
          ],
          root: ["./"],
          assets: ["./assets"],
        },
      ],
      [
        'babel-plugin-rewrite-require',
        {
          aliases: {
            stream: 'readable-stream',
          },
        },
      ],
    ]
  };
};
