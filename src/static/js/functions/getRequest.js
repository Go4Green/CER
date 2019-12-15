import axios from 'axios';
import { get as axiosGet } from 'axios';
import { error as logError } from "./logger";

async function getRequest(url, configData, sync, callback, errorCallback) {

    configData = configData || {};

    function responseHandler(result) {
        if( callback instanceof Function ) {
            callback( result );
        }
    }

    function errorHandler(error) {
        if( errorCallback instanceof Function ) {
            errorCallback( error );
        }
    }

    if( sync ){
        await axiosGet(url, configData).then(responseHandler).catch(errorHandler || null);
    }
    else{
        axiosGet(url, configData).then(responseHandler).catch(errorHandler || null);
    }
}

export default getRequest;
