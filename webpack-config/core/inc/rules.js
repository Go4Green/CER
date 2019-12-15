 const path = require('path');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 function rules( is_build, root_folder ) {
    return [{
        test: /\.(jsx|js)?$/,
        use: 'babel-loader'
    },
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            { loader: is_build ? MiniCssExtractPlugin.loader : 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
        ],
    },
    {
        test: /\.(png|jpe?g|gif)(\?\S*)?$/,
        use: {
            loader: 'url-loader',
            options: {
                limit:1024,
                fallback:'file-loader',
                name: (file) => {
                    return '.' + path.join( file.replace(root_folder, ""), ".." ).replace(/\\/g, "/") + "/[name].[ext]";
                },
            },
        },
    },
    {
        test: /\.modernizrrc.js$/,
        use: 'modernizr-loader',
    },
    {
        test: /\.modernizrrc(\.json)?$/,
        use: [ 'modernizr-loader', 'json-loader'],
    }
    ];
};

module.exports = rules;
