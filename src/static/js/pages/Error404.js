import React from 'react';

import ApplicationStore from '../ApplicationStore';

import _PageComponent from './_PageComponent';

import Content from './_Content';

class Error404 extends _PageComponent {

	render(){
		return <Content>
					<h1>{ ApplicationStore.get('title') }</h1>
				</Content>;
	}
}

export default Error404;
