const extend = require('../core/functions/extend');
const formatPagesData = require('./functions.js').formatPagesData;

const projectSources = require('./sources');

module.exports = formatPagesData(projectSources, {
    index: {
        title: "",
        filename: "index.html",
        html: {
            body: '<div class="app"></div>'
        },
        jsobj: {},
    }
});
