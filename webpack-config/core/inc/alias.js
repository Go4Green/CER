const path = require('path');

function alias(is_build, use_preact){

	let ret = {
        modernizr$: path.resolve( __dirname, "../../../.modernizrrc" )
    };

    use_preact = void 0 === typeof use_preact ? true : !! use_preact;

    if( is_build && use_preact ){
        ret.react = 'preact-compat'; // @note: Use PreactJS instead of React.
        ret['react-dom'] = 'preact-compat'; // @note: Use PreactJS instead of ReactDom.
        ret['create-react-class'] = 'preact-compat/lib/create-react-class';
        ret['react-dom-factories'] = 'preact-compat/lib/react-dom-factories';
    }

    return ret;
}

module.exports = alias;