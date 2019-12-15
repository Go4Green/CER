import React from 'react';

import * as ApplicationActions from '../ApplicationActions';
import ApplicationStore from '../ApplicationStore';

import routeLocationUrl from '../functions/routeLocationUrl';

class RoutesFactory extends React.PureComponent {

    constructor(props) {
        
        super(props);

        this.state = {
            href: routeLocationUrl(props.location),
        };

        ApplicationActions.init_page(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const new_href = routeLocationUrl(nextProps.location);

        if (new_href !== prevState.href) {
            
            ApplicationActions.update_page(nextProps);

            return {
                href: new_href,
            };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        return <this.props.page.component {...this.props} />;
    }
}

export default RoutesFactory;