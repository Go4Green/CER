import React from 'react';

import ApplicationStore from '../ApplicationStore';

import _PageComponent from './_PageComponent';

import Content from './_Content';

class Home extends _PageComponent {

    render() {
        return <Content>
					<h1>{ ApplicationStore.get('title') }</h1>
				</Content>;
    }
}

export default Home;
