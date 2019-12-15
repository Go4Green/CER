const extend = require('../core/functions/extend');

function formatPagesData(sources, pages) {

    let k, ret = {};

    for (k in pages) {
        if (pages.hasOwnProperty(k)) {
            ret[k] = {
                title: void 0 !== pages[k].title && pages[k].title ? pages[k].title : sources.title || null,
                filename: void 0 !== pages[k].filename && pages[k].filename ? pages[k].filename : sources.filename || null,
                html: {
                    head_meta: sources.html.head_meta || null,
                    head_links: sources.html.head_links || null,
                    stylesheets: sources.html.stylesheets || null,
                    scripts: sources.html.scripts || null,
                    body: sources.html.body || null,
                },
                jsobj: extend({}, sources.jsobj)
            };

            if (void 0 !== pages[k].html) {

                if (pages[k].html.stylesheets && pages[k].html.stylesheets.length) {

                    if (ret[k].html.stylesheets) {
                        ret[k].html.stylesheets = ret[k].html.stylesheets.concat(pages[k].html.stylesheets);
                    } else {
                        ret[k].html.stylesheets = pages[k].html.stylesheets;
                    }
                }

                if (pages[k].html.scripts && pages[k].html.scripts.length) {

                    if (ret[k].html.scripts) {
                        ret[k].html.scripts = ret[k].html.scripts.concat(pages[k].html.scripts);
                    } else {
                        ret[k].html.scripts = pages[k].html.scripts;
                    }
                }

                ret[k].html.body = void 0 !== pages[k].html.body ? pages[k].html.body : ret[k].html.body;
            }

            if (void 0 !== pages[k].jsobj) {
                ret[k].jsobj = extend(ret[k].jsobj, pages[k].jsobj);
            }
        }
    }

    return ret;
}

module.exports = { formatPagesData };