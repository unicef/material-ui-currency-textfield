var path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve("./dist"),
        filename: "index.js",
        libraryTarget: "commonjs2",
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.json', '.wasm'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    externals: {
        react: "react",
    },
};
