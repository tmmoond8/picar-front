const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  addDecoratorsLegacy,
  disableEsLint,
  override,
  useBabelRc,
} = require('customize-cra');

const hash = process.env.COMMIT_REF ? `.${process.env.COMMIT_REF}` : '';

const output = () => (config) => {
  config.output.filename = `static/js/[name]${hash}.js`
  config.output.chunkFilename = `static/js/[name]${hash}.chunk.js`
  const miniCssExtractPlugin = config.plugins.find((plugin) => plugin instanceof MiniCssExtractPlugin);
  miniCssExtractPlugin.options.filename = `static/css/[name]${hash}.css`;
  miniCssExtractPlugin.options.chunkFilename = `static/css/[name]${hash}.chunk.css`;
  return config;
}

module.exports = {
  webpack: override(
    disableEsLint(), 
    addDecoratorsLegacy(), 
    useBabelRc(),
    output(),
  ),
};
