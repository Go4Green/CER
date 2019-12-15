import React from 'react';
import { Redirect } from 'react-router-dom';

import ApplicationStore from '../ApplicationStore';

import _PageComponent from './_PageComponent';

import Content from './_Content';

import RoutePagesList from '../components/RoutePagesList';

class Sitemap extends _PageComponent {

	render(){
		return <Content>
					<h1>{ ApplicationStore.get('title') }</h1>
					<RoutePagesList />
				</Content>;
	}
}

export default Sitemap;
