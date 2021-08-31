const {
  addDecoratorsLegacy,
  disableEsLint,
  override,
  useBabelRc,
} = require('customize-cra');

const hash = process.env.COMMIT_REF ? `.${process.env.COMMIT_REF}` : '';

const output = () => (config) => {
  // 기본 js 파일명 변경
  config.output.filename = `static/js/[name]${hash}.js`
  config.output.chunkFilename = `static/js/[name]${hash}.chunk.js`;
  config.plugins.forEach(plugin => {
    if (plugin && plugin.options) {
      const { filename } = plugin.options;
      // 기본 css 파일명 변경
      if (filename && filename.includes('static/css')) {
        plugin.options.filename = `static/css/[name]${hash}.css`;
        plugin.options.chunkFilename = `static/css/[name]${hash}.chunk.css`;
      }
    }
  })
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
