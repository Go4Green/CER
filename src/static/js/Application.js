import React from 'react';
import { Switch } from 'react-router-dom';

import ApplicationStore from './ApplicationStore';
import * as ApplicationActions from './ApplicationActions';

import AppRouter from './components/AppRouter';
import RouteLink from './components/RouteLink';

import Navigation from './ui_components/Navigation';

import extractPagesRoutes from './functions/extractPagesRoutes';

import pagesList from './pages-list';

class Application extends React.PureComponent {

	constructor(props){
		super(props);
	}

	render(){

		return <div className="page">
					
					<div className="page-header">
						<AppRouter basename="/" >
							<div className="header">
								
							</div>
						</AppRouter>
					</div>

					<div className="page-sidebar">
						<AppRouter basename="/" >
							<div className="sidebar">
								<Navigation />
							</div>
						</AppRouter>
					</div>
					
					<div className="page-content">
						<AppRouter basename="/" >
							<Switch>{ extractPagesRoutes( pagesList ) }</Switch>
						</AppRouter>
					</div>

				</div>;
	}
}

export default Application;
