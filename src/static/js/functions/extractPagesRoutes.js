import React from 'react';
import { Route } from 'react-router-dom';

import RoutesFactory from '../components/RoutesFactory';

import Error404 from '../pages/Error404';

function routeRenderer(page_data) {
    return function(props) {
        return <RoutesFactory {...props} page={page_data} />;
    }
}

export default function( pages ) {

    const ret = [];

    let k;

    for (k in pages) {

        if (pages.hasOwnProperty(k)) {

            if (void 0 !== typeof pages[k].exact && pages[k].exact) {
                ret.push(<Route exact key={k} path={ pages[k].path } render={ routeRenderer( pages[k] ) } />);
            } else {
                ret.push(<Route key={k} path={ pages[k].path } render={ routeRenderer( pages[k] ) } />);
            }
        }
    }

    if ( !!! pages.error_404 ){
        ret.push(<Route key="error_404" path="*" render={ routeRenderer( { title: 'Error 404', component: Error404 } ) } />);
    }

    return ret;
}