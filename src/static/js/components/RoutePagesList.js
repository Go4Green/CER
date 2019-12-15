import React from 'react';
import NavLink from '../components/RouteNavLink';
import pagesList from '../pages-list';

class RoutePagesList extends React.PureComponent{

	constructor(props){
		
		super(props);

		this.pageItems = [];
		
		let k;
		
		for( k in pagesList ){

			if( pagesList.hasOwnProperty(k) ){
				this.pageItems.push( <li key={k}><NavLink to={ pagesList[k].path }>{ pagesList[k].title }</NavLink></li> );
			}
		}
	}

	render(){
		return <ul>{ this.pageItems }</ul>;
	}
}

export default RoutePagesList;
