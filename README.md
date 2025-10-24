# repo-template
This is a basic template repository to copy and build projects off of
It comes with:
- An html, css, and javascript file
- a preconfigured package.json
- a preconfigured webpack.config.js

## Dependencies
- css-loader
- html-loader
- html-webpack-plugin
- style-loader
- webpack
- webpack-cli
- webpack-dev-server

## Scripts
- "build": "webpack --config webpack.prod.js"
- "dev": "webpack serve --config webpack.dev.js"
- "deploy": "git subtree push --prefix dist origin gh-pages"

Make sure to change name, description, and urls in the package.json
