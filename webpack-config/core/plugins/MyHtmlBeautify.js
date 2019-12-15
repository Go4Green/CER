const _ = require('lodash');
const webpack = require('webpack');
const beautify = require('js-beautify').html;
const HtmlWebpackPlugin = require('html-webpack-plugin');

function htmlPluginDataFunction (htmlPluginData, options, callback) {
	htmlPluginData.html = beautify(_.reduce(options.replace, (res, item) => {
        if(typeof item === 'string' || item instanceof RegExp){
            return res.replace(item instanceof RegExp ? item : new RegExp(item, 'gi'), '');
        }
        else{
            return res.replace(item.test instanceof RegExp ? item.test : new RegExp(item.test, 'gi'), item.with || '');
        }
    }, htmlPluginData.html), options.config);
    callback(null, htmlPluginData);
}

class MyHtmlBeautify {

	apply(compiler) {
	
		const options = {
			config: {
				indent_size: 4,
				indent_with_tabs: false,
				html: {
					end_with_newline: true,
					indent_inner_html: true,
					preserve_newlines: true,
				}
			},
			replace: []
		};

	    compiler.hooks.compilation.tap('MyHtmlBeautify', compilation => {
			HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('MyHtmlBeautify', (htmlPluginData, callback) => {
		    	htmlPluginDataFunction (htmlPluginData, options, callback);
		    });
	    });
  	}
}

module.exports = MyHtmlBeautify;
