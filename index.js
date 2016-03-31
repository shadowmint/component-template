var fs = require('fs');
var path = require('path');
var exports = module.exports = {};

/** Export component name */
exports.name = function name() {
  return 'template';
}

/** Export scripts path for build */
exports.scripts = function scripts() {
  return path.join(__dirname, 'src/scripts/**/*.js');
};

/** Create a file of the given name with a link to the manifest */
exports.styles = function styles(target) {
   var manifest = path.join(__dirname, 'src/styles/manifest.scss');
   fs.writeFileSync(target, `@import '${manifest}';`);
};
