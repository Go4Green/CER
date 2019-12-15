import React from 'react';
import { Link } from 'react-router-dom';

import ApplicationStore from '../ApplicationStore';
import * as ApplicationActions from '../ApplicationActions';

import absoluteLinkHref from '../functions/absoluteLinkHref';

class RouteLink extends React.PureComponent {

	constructor(props){
		super(props);
		this.onClickCallback = this.onClickCallback.bind(this);
	}

	onClickCallback(event){

		let toPathname = event.target.getAttribute('href');

		if( "#" === toPathname.charAt(0) ){
			toPathname = toPathname.substr(1);
		}

		if( toPathname === ApplicationStore.get('pathname') ){
			 event.preventDefault();
			 event.stopPropagation();
		}
		else{
			ApplicationActions.link_click( toPathname );
		}

		if( 'function' === typeof this.props.onClick ){
			this.props.onClick(event);
		}
	}

	render(){
		return <Link {...this.props} onClick={ this.onClickCallback } />;
	}
}

export default RouteLink;
