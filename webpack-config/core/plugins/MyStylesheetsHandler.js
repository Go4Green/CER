const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class MyStylesheetsHandler {

	apply( compiler ) {

	    compiler.hooks.compilation.tap('MyStylesheetsHandler', compilation => {

	    	/*console.log( "\n\n" );
			console.log( HtmlWebpackPlugin.getHooks(compilation) );
			console.log( "\n\n" );*/

			HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('MyStylesheetsHandler', (htmlPluginData, callback) => {

				// console.log( "\n\n" );
				// console.log( htmlPluginData.assetTags.styles );
				// console.log( "\n\n" );
				
				let i, t, pathParts;
				i = 0;
				while( i < htmlPluginData.assetTags.styles.length ){
					
					// htmlPluginData.assetTags.styles[i].attributes['disabled'] = '';
					pathParts = htmlPluginData.assetTags.styles[i].attributes.href.split("/");
					t = pathParts[ pathParts.length - 1 ];
					pathParts[ pathParts.length - 1 ] = "dark_theme";
					pathParts.push( t );

					htmlPluginData.assetTags.styles[i].attributes['data-theme_light'] = htmlPluginData.assetTags.styles[i].attributes.href;
					htmlPluginData.assetTags.styles[i].attributes['data-theme_dark'] = pathParts.join("/");
					pathParts = htmlPluginData.assetTags.styles[i].attributes.href = '';

					console.log( htmlPluginData.assetTags.styles[i] );
					i += 1;
				}
				console.log( "\n" );

				/*const stylesheetsLinkTagRegex = new RegExp( '<link\s?[^>]*(?:rel=[\'"]?stylesheet[\'"]?)[^>]*>', 'g' );
				const hrefAttrValueRegex = new RegExp( 'href="(.+?)"' );

				const ssheets = htmlPluginData.html.match( stylesheetsLinkTagRegex );
				let i, arr;

				console.log( "\n\n" );
				// console.log( ssheets );
				// console.log( "\n\n" );

				if( ssheets.length ){
					i = 0;
					while( i < ssheets.length ){

						arr = ssheets[i].match( hrefAttrValueRegex );

						if( arr && arr.length ){
							console.log( arr[1] );
						}

						i += 1;
					}
					console.log( "\n" );
				}*/

				// console.log( "\n" );

				callback( null, htmlPluginData );
		    });

	    });
  	}
}

module.exports = MyStylesheetsHandler;
