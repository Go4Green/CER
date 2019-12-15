import Dispatcher from './singleton_instances/dispatcher.js';

export function init_page(pageProps) {
    Dispatcher.dispatch({
        type: 'INIT_PAGE',
        pageProps,
    });
};

export function update_page( pageProps ) {
    Dispatcher.dispatch({
        type: 'UPDATE_PAGE',
        pageProps,
    });
};

export function link_click( pathname ) {
    Dispatcher.dispatch({
        type: 'LINK_CLICK',
        pathname,
    });
};
