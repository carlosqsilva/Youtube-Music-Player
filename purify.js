const purify = require("purify-css")

var content = ['./assets/js/*.js', './*.html'];
var css = ['./node_modules/bulma/css/*.css'];

var options = {
  // Will write purified CSS to this file.
  output: './assets/css/purified.css',
  minify: true
};

purify(content, css, options);