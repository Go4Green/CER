import React from 'react';
import { NavLink } from 'react-router-dom';
import RouteLink from './RouteLink';

class RouteNavLink extends RouteLink {

	render(){
		return <NavLink {...this.props} onClick={this.onClickCallback} />;
	}
}

export default RouteNavLink;
