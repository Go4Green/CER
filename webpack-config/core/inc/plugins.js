const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const MyHtmlBeautify = require('../plugins/MyHtmlBeautify');

const projectPages = require('../../project/pages');

const extend = require('../functions/extend');

function plugins(is_build, css_root_folder ){

	let k, x, ret = [ new CssUrlRelativePlugin() ];

    if (is_build) {

        ret.push(new MiniCssExtractPlugin(
            {
                // filename: ! is_build ? '[name].css' : '[name].[hash].css',
                // chunkFilename: ! is_build ? '[id].css' : '[id].[hash].css',
                filename: css_root_folder + "[name].css",
                // chunkFilename: "../css/[id].css",
            }
        ));
    }

    // @link: https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs

    for( k in projectPages ){

    	if( projectPages.hasOwnProperty(k) ){

			x = {
				template: path.resolve('includes', 'template.ejs'),
	            hash: false,
	            mobile:true,
	            chunks: [k],
			};

			if( projectPages[k].title ){
				x.title = projectPages[k].title;
			}

			if( projectPages[k].filename ){
				x.filename = projectPages[k].filename;
			}

			if( projectPages[k].html.body ){
				x.bodyHtmlSnippet = projectPages[k].html.body;
			}

			if( projectPages[k].html.stylesheets && projectPages[k].html.stylesheets.length ){
				x.links = projectPages[k].html.stylesheets;
			}

			if( projectPages[k].html.scripts && projectPages[k].html.scripts.length ){
				x.scripts = projectPages[k].html.scripts;
			}

			if( projectPages[k].jsobj.window && Object.keys(projectPages[k].jsobj.window).length ){
				x.window = projectPages[k].jsobj.window;
			}

			if( projectPages[k].html.head_meta ){
				x.meta = projectPages[k].html.head_meta;
			}

			if( projectPages[k].html.head_links ){
				x.links = x.links ? x.links.concat( projectPages[k].html.head_links ) : projectPages[k].html.head_links;
			}

			ret.push( new HtmlWebpackPlugin( x ) );
    	}
    }

	if (is_build) {

        ret.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            generateStatsFile: false,
            reportFilename: '_report.html',
        }));
    }

    ret.push( new MyHtmlBeautify() );

    return ret;
}

module.exports = plugins;