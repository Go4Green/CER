import React from 'react';
import { EventEmitter } from 'events';
import Cookie from 'js-cookie';
// import LocalCache from './classes/LocalCache';
import SessionCache from './classes/SessionCache';
import exportStore from './functions/exportStore';
// import { ListDataRequestsHandler, SingleDataRequestsHandler } from './classes/RequestsHandlers/index.js';

class ApplicationStore extends EventEmitter{

    constructor() {
        
        super();
        
        this.data = {
            page: null,
            match: null,
            location: null,
        };

        // this.browserCache = new LocalCache( 'go4green-cer-webapp', 86400 );  // Keep cache data "fresh" for one day.
        this.browserCache = new SessionCache( 'go4green-cer-webapp' );
    }

    update_data(pageProps){
        this.data.page = pageProps.page;
        this.data.match = pageProps.match;
        this.data.location = pageProps.location;
    }
    
    get(type){
        
        let ret = null;
        
        switch(type){
            case 'title':
                ret = this.data.page ? this.data.page.title : null;
                break;
            case 'location':
                ret = this.data.location;
                break;
            case 'hash':
                ret = this.data.location ? this.data.location.hash : null;
                break;
            case 'pathname':
                ret = this.data.location ? this.data.location.pathname : null;
                break;
            case 'params':
                ret = this.data.match ? this.data.match.params : null;
                break;
        }
        return ret;
    }

    set_cache( key, value ){
        this.browserCache.set( key, value );
    }

    get_cache( key ){
        return this.browserCache.get( key );
    }

    actions_handler(action) {

        switch(action.type) {
            case 'INIT_PAGE':
                this.update_data(action.pageProps);
                this.emit('init_page');
                this.emit('update_page');
                break;
            case 'UPDATE_PAGE':
                this.update_data(action.pageProps);
                this.emit('update_page');
                break;
            case 'LINK_CLICK':
                this.emit('link_click');
                break;
        }
    }
}

export default exportStore( new ApplicationStore, 'actions_handler' );
