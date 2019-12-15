/*
 @link: https://realfavicongenerator.net [Favicons generator]
 */

/*<link rel="apple-touch-icon" sizes="180x180" href="static/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="static/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="static/favicons/favicon-16x16.png">
<link rel="manifest" href="static/favicons/site.webmanifest">
<link rel="mask-icon" href="static/favicons/safari-pinned-tab.svg" color="#009933">
<link rel="shortcut icon" href="static/favicons/favicon.ico">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-config" content="static/favicons/browserconfig.xml">
<meta name="theme-color" content="#ffffff">*/

module.exports = {
	html: {
        head_meta:[],
        head_links:[],
        stylesheets: [
            // 'https://fonts.googleapis.com/icon?family=Material+Icons',
            // 'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese',
            // 'https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css'
        ],
        // scripts: [ 'https://d3js.org/d3.v5.min.js' ],
        scripts: [
            '//d3js.org/d3.v3.min.js',
            '//labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js',
        ],
        body: null,
    },
    jsobj:{
    	window: null,
    }
};
