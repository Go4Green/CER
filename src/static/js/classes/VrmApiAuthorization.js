import postRequest from '../functions/postRequest';

function VrmApiAuthorization(loginCallback, logoutCallback) {

    var token = null;
    var user_id = null;

    var api_url = {
        // login: "https:/vrmapi.victronenergy.com/v2/auth/login",
        login: "https://vrmapi.victronenergy.com/v2/auth/loginAsDemo",
        // logout: "https:/vrmapi.victronenergy.com/v2/auth/logout",
        logout: "https://vrmapi.victronenergy.com/v2/auth/logout",
    };

    function isLoggedIn(){
        return null !== token && null !== user_id;
    }

    function getToken(){
        return token;
    }

    function getUserId(){
        return user_id;
    }

    function login(){
    // function login(username, password){
        
        if ( isLoggedIn() ) {
            return;
        }

        // postRequest( api_url.login, { "username": username, "password": password }, {}, false, onLogin, onRequestFail );
        postRequest( api_url.login, {}, {}, false, onLogin, onRequestFail );
    }

    function logout(){
        
        if ( ! isLoggedIn() ) {
            return;
        }

        postRequest( api_url.logout, {}, {}, false, onLogout, onRequestFail );
    }

    function onLogin(response){

        token = response.data.token;
        // user_id = response.data.idUser;
        user_id = 22;   // @note: Demo user id.

        if( 'function' === typeof loginCallback ){
            loginCallback();
        }
    }

    function onLogout(response){

        token = null;
        user_id = null;
        
        if( 'function' === typeof logoutCallback ){
            logoutCallback();
        }
    }

    function onRequestFail(error){
        console.error( error );
    }

    return Object.freeze({
        login: login,
        logout: logout,
        getToken: getToken,
        getUserId: getUserId,
        isLoggedIn: isLoggedIn,
    });
}

export default VrmApiAuthorization;
