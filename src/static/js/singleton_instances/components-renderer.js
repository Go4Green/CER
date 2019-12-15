import React from 'react';
import ReactDOM from 'react-dom';
import { errorLoggerAndErrorReturn, warnLoggerAndErrorReturn } from "../functions/errors";

function componentRenderer(){
	
	var instances = {};
	var wrapperElems = {};

	function element(wrapEl, id){
		if( id && void 0 === wrapperElems[id] ){ wrapperElems[id] = wrapEl; }
		return wrapperElems[id];
	}

	function render(wrapEl, AppComp, props){
		return wrapEl && AppComp ? ReactDOM.render( <AppComp {...props} />, wrapEl ) : null;
	}

	return {
		display: function(wrapEl, AppComp, props, id){
			
			if(! wrapEl ){
				return errorLoggerAndErrorReturn(["Invalid dom element to render the component", wrapEl]);
			}
			
			if(! AppComp ){
				return errorLoggerAndErrorReturn(["Invalid component's reference to render", AppComp]);
			}

			id = id || ( AppComp ? AppComp.name + "_" + new Date().valueOf() : null ) ;
			
			if( id && void 0 === instances[id] ){
				instances[id] = element(wrapEl, id) ? render( element(wrapEl, id), AppComp, props ) : null;
			}
			
			return instances[id];
		}
	};
};

export default componentRenderer();
