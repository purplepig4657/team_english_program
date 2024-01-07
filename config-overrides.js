const path = require("path");

module.exports = function override(config, env) {
    return {
        mode: "none",
        entry: "./public/Main.js",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "static/js/[name].[contenthash:8].js",
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        target: 'electron-main',
    }
}
