var path = require('path');
var exports = module.exports = {};

/** Export scripts path for build */
exports.scripts = function scripts() {
  return path.join(__dirname, 'src/scripts/**/*.js');
};
