export default function(location) {
    return ( location.pathname || "" ) + ( location.search || "" ) + ( location.hash || "" );
};