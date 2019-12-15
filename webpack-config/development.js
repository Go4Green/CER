const path = require('path');
module.exports = require( './webpack.js' )( path.join(__dirname, '..'), 'src', 'development' );