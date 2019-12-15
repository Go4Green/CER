import getRequest from '../functions/getRequest';
import VrmApiAuthorization from './VrmApiAuthorization';

function VrmApiHandler(loginCallback, logoutCallback, installationsCallback, installationDataCallback) {

    var auth = new VrmApiAuthorization( loginCallback, logoutCallback );

    var api_url = {
        installations: function(user_id) { 
            return "https://vrmapi.victronenergy.com/v2/users/" + user_id + "/installations";
        },
        installations_data: function(site_id, args) {
            return "https://vrmapi.victronenergy.com/v2/installations/" + site_id + "/stats" + args;
        },
    };

    var fetched = {
        installations: null,
        installations_data: {},
    };

    function getInstallations(){
        return fetched.installations;
    }

    function getInstallationsData(){
        return fetched.installations_data;
    }

    function fetchInstallations(){

        if (null !== fetched.installations) {
            return
        }

        if ( ! auth.isLoggedIn() ) {
            return;
        }

        getRequest( api_url.installations( auth.getUserId() ), { headers: { "X-Authorization" : "Bearer " + auth.getToken() } }, false, onFetchInstallations, onRequestFail );
    }

    function fetchInstallationData( site_id, args ){

        if ( fetched.installations_data[ site_id ] ) {
            return
        }

        if ( ! auth.isLoggedIn() ) {
            return;
        }

        var k;
        var args_str;
        var args_arr = [];
        
        for (k in args) {
            if (args.hasOwnProperty(k)) {
                args_arr.push(k + '=' + args[k]);
            }
        }

        args_str = args_arr.join("&");
        args_str = "?" + args_str;

        $.ajax({
            "method": "GET",
            "url": api_url.installations_data( site_id, args_str),
            "headers": { "X-Authorization": "Bearer " + auth.getToken() }
        })
        .done( function(data, textStatus, jqxhr ){
            onFetchInstallationData(data, textStatus, jqxhr, site_id);
        }).fail( onRequestFail );
    }

    function onFetchInstallations(response){
        
        fetched.installations = response.data.records;

        if( 'function' === typeof installationsCallback ){
            installationsCallback();
        }
    }

    function onFetchInstallationData(data, textStatus, jqxhr, site_id){

        fetched.installations_data[ site_id ] = data;

        if( 'function' === typeof installationDataCallback ){
            installationDataCallback( site_id, data );
        }
    }

    function onRequestFail(error){
        console.error( error );
    }

    return Object.freeze({
        login: auth.login,
        logout: auth.logout,
        getInstallations: getInstallations,
        getInstallationsData: getInstallationsData,
        fetchInstallations: fetchInstallations,
        fetchInstallationData: fetchInstallationData,
    });
}

export default VrmApiHandler;