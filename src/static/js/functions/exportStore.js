import * as dispatcher from '../singleton_instances/dispatcher';

export default function(store, handler){
	dispatcher.register(store[handler].bind(store));
    return store;
}