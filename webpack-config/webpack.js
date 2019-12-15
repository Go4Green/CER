/**
 * FOR PROJECTS GUIDELINES: https://github.com/wearehive/project-guidelines#documentation
 *
 * TODO: Check AGAIN: https://philipwalton.com/articles/deploying-es2015-code-in-production-today/
 *       Found in video: https://www.youtube.com/watch?v=7rx9fSUG8H0
         MUST be checked, because need to integrade better JS code imports in documents, giving also various options (async, order, critical etc).
         One more reason, is that need to remove deprecated chuncks functions.
         Also, would be better to enable the ability for different projects to create and handle independent their imports.
 *
 * TODO: UglifyJS doesn't support (yet) ES2015 and when is enabled need to transform all exports into ES5 (eg. by adding "forceAllTransforms" in "targets" of file .babelrc).
 *       So, take a look in https://github.com/babel/minify, in case could integrate it under conditions.
 *
 * TODO: Check for WordPress browsers support list:
 *       a) https://twitter.com/Browserslist/status/918083863083175936
 *       b) https://github.com/ntwb/browserslist-config-wordpress
 *       c) https://make.wordpress.org/design/handbook/design-guide/browser-support/
 */

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let base_dir = null,
    base_src_rel_dir = null,
    base_dest_rel_dir = null,
    is_build = false;

const get = (function() {

    const output_path = function() {
        return is_build ? path.join(base_dir, base_dest_rel_dir) : path.join(base_dir, base_src_rel_dir);
    };

    const output_filename = function( prefix, chunkhash, hash) {
        prefix = prefix || "";
        if( chunkhash ){
            return prefix + "[name]-[chunkhash].js";
        }
        else if( hash ){
            return prefix + "[name]-[hash].js";
        }
        return prefix + "[name].js";
    };

    return {
        context: function() {
            return path.join(base_dir);
        },
        inputs: require('./core/inc/inputs'),
        output: function() {
            return {
                path: output_path(),
                filename: output_filename(is_build ? "./static/js/" : "" ),
            };
        },
        alias: require('./core/inc/alias'),
        rules: require('./core/inc/rules'),
        plugins: require('./core/inc/plugins'),
    }
}());

const UglifyJsConfig = {
    cache: true,
    parallel: true,
    uglifyOptions:{
        /*
         * @link: https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
         */
        output: {
            comments: false,
        },
    },
};

/*
 * @note: Default compressor of "optimize-css-assets-webpack-plugin" is "cssnano".
 * @link: https://github.com/NMFR/optimize-css-assets-webpack-plugin
 * @link: https://cssnano.co/optimisations/
 */

const OptimizeCSSAssetsConfig = {};

const configProduction = function() {

    const chunksCacheGroups = {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 100,
            chunks: "all",
            enforce: true,
        },
    };

    chunksCacheGroups.vendors.name = "_vendors"; // @note: Merges all "vendor" files.

    /*chunksCacheGroups.commons = {
        chunks: "initial",
        minChunks: 2,
        maxInitialRequests: 8, // @note: Tested values from 0 to 10, and changes applied with values 0, 4, 5, 6, 7, 8.
        minSize: 0,
    };

    chunksCacheGroups.commons.name = "_commons"; // @note: Merges all "commons" files.
    */

    let ret = {
        entry: get.inputs( base_dir, base_src_rel_dir ),
        output: get.output(),
        module: {
            rules: get.rules(true, path.join( base_dir, base_src_rel_dir ) )
        },
        resolve: {
            alias: get.alias(true, false),  // @note: Disable preact alias.
        },
        mode: 'production',
        devtool: 'source-maps',
        optimization: {
            minimizer: [
                new UglifyJsPlugin( UglifyJsConfig ),
                new OptimizeCSSAssetsPlugin( OptimizeCSSAssetsConfig )
            ],
            runtimeChunk: false,
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '-',
                cacheGroups: chunksCacheGroups,
            }
        },
        plugins: get.plugins( true, "./static/css/" ),
        node: {
            dns: 'mock',
            net: 'mock'
        },
    };

    return ret;
};

const configDevelopment = function() {
    let ret = {
        entry: get.inputs( base_dir, base_src_rel_dir ),
        output: get.output(),
        module: {
            rules: get.rules(false, path.join( base_dir, base_src_rel_dir ) ),
        },
        plugins: get.plugins( false, "./static/css/" ),
        resolve: {
            alias: get.alias(false, false),  // @note: Disable preact alias.
        },
        mode: 'development',
        devtool: 'eval',
        node: {
            dns: 'mock',
            net: 'mock'
        },
        devServer:{
            watchOptions: {
                poll: true,
            },
            contentBase: path.join(__dirname, '../src'),
            compress: true,
            inline: true,
            hot: true,
            host: 'localhost',
            port: 8080
        }
    };
    return ret;
};

module.exports = function(root_path, root_src, config_type) {

    base_dir = root_path;
    base_src_rel_dir = root_src;

    switch (config_type) {
        case 'build':
            is_build = true;
            base_dest_rel_dir = base_src_rel_dir.replace("src", "build");
            ret = configProduction();
            break;
        case 'development':
            ret = configDevelopment();
            break;
    }

    return ret;
}
