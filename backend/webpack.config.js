const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  target: "node",
  entry: path.resolve(__dirname, "src", "server.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      querystring: false,
      buffer: false,
      os: false,
      string_decoder: false,
      util: false,
      url: false,
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        path.resolve(__dirname, "prisma", "schema.prisma"),
        path.resolve(__dirname, "prisma", "dev.db"),
        path.resolve(__dirname, ".env"),
        {
          from: path.resolve(__dirname, "prisma", "client"),
          filter: (filePath) => {
            return filePath
              ?.split?.(/\/|\\/)
              .slice(-1)[0]
              ?.startsWith?.("libquery");
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
