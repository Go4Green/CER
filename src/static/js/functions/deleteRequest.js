import axios from 'axios';
import { delete as axiosDelete } from 'axios';
import { error as logError } from "./logger";

async function deleteRequest(url, configData, sync, callback, errorCallback) {

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
        await axiosDelete(url, configData).then(responseHandler).catch(errorHandler || null);
    }
    else{
        axiosDelete(url, configData).then(responseHandler).catch(errorHandler || null);
    }
}

export default deleteRequest;
