import React from 'react';
import { matchPath } from 'react-router-dom';

import ApplicationStore from '../ApplicationStore';
import * as ApplicationActions from '../ApplicationActions';

import RouteLink from '../components/RouteLink';

/*@link: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/matchPath.md*/

function matchItemPathname( path1, path2 ){
	return matchPath( path1, { path: path2, strict: true, exact: true } );
}

function matchParentItemPathname( path1, path2 ){
	return matchPath( path1, { path: path2, strict: false, exact: false } );
}

function item_entity(title, href, addNewLabel, viewAllLabel){
	const ret = { title: title, href: href, children: [] };
	if( void 0 !== viewAllLabel ){ ret.children.push({ title: viewAllLabel, href: href }); }
	if( void 0 !== addNewLabel ){ ret.children.push({ title: addNewLabel, href: href + "/add" }); }
	return ret;
}

function generateMenuListItems( pathname ){

	function item_component( item, level, order ){

		level = void 0 === level ? 0 : parseInt( level, 10 );
		order = void 0 === order ? 0 : parseInt( order, 10 );

		let item_key = level + "." + order;

		let ret = <RouteLink to={ item.href } title={ item.title }>{ item.title }</RouteLink>;
		

		if( !! item.children && item.children.length ){

			let i = 0;
			let sub = [];
			
			while( i < item.children.length ){
				sub.push( item_component( item.children[i], level + 1, i ) );
				i++;
			}
			
			ret = <Item key={ item_key } level={ level } order={ order } active={ !! matchItemPathname( pathname, item.href ) } activeParent={ !! matchParentItemPathname( pathname, item.href ) }>{ ret }<ul>{ sub }</ul></Item>;
		}
		else{
			ret = <Item key={ item_key } level={ level } order={ order } active={ !! matchItemPathname( pathname, item.href ) } activeParent={ !! matchParentItemPathname( pathname, item.href ) }>{ ret }</Item>;
		}

		return ret;
	}

	function item_component_home(title){				
		return <Item home key={ "0.0" } level={ 0 } order={ 0 } active={ !! matchItemPathname( pathname, "/" ) } activeParent={ false }>{ <RouteLink to="/" title={ title }>{ title }</RouteLink> }</Item>;
	}

	const list = [];
	
	// list.push( item_component_home( "Αρχική" ) );
	list.push( item_component( item_entity( "Διερεύνηση επένδυσης", "/investment" ), 0, 2 ) );
	list.push( item_component( item_entity( "Παρακολούθηση μονάδας", "/monitoring" ), 0, 3 ) );
	list.push( item_component( item_entity( "Παραδείγματα κακής λειτουργίας", "/malfunction" ), 0, 4 ) );

	return list;
}

class Item extends React.PureComponent{

	constructor(props){
		super(props);
		this.state = { active: props.active, activeParent: props.activeParent };
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return { active: nextProps.active, activeParent: nextProps.activeParent };
	}

	render(){

		if( !! this.props.home ){
			return <li className={ this.state.active ? "active active-item" : "" }>{ this.props.children || null }</li>;
		}

		if( this.state.active ){
			return <li className="active active-item">{ this.props.children || null }</li>;
		}

		if( this.state.activeParent ){
			return <li className="active active-parent">{ this.props.children || null }</li>;
		}

		return <li>{ this.props.children || null }</li>;
	}
}

class ItemList extends React.PureComponent{

	constructor(props){

		super(props);

		this.state = {
			pathname: ApplicationStore.get('pathname'),
		};

		this.onPageUpdate = this.onPageUpdate.bind(this);

		ApplicationStore.on( 'update_page', this.onPageUpdate );
	}

	componentWillUnmount(){
		ApplicationStore.removeListener( 'update_page', this.onPageUpdate );
	}

	onPageUpdate(){
		this.setState({
			pathname: ApplicationStore.get('pathname'),
		});
	}

	render(){
		return this.state.pathname ? <ul>{ generateMenuListItems( this.state.pathname ) }</ul> : null;
	}
}

class Navigation extends React.PureComponent{
	
	render(){
		return <div className="navigation"><nav className="navigation-menu"><ItemList /></nav></div>;
	}
}

export default Navigation;
