import React from 'react';

import ApplicationStore from '../ApplicationStore';

import _PageComponent from './_PageComponent';

import Content from './_Content';

import VrmApiHandler from '../classes/VrmApiHandler';

import Chart1 from '../ui_components/charts/Chart1';
import Chart2 from '../ui_components/charts/Chart2';
import Chart3 from '../ui_components/charts/Chart3';
import Chart4 from '../ui_components/charts/Chart4';
import Chart5 from '../ui_components/charts/Chart5';
import Chart6 from '../ui_components/charts/Chart6';
import Chart7 from '../ui_components/charts/Chart7';

function requestsHandler(){

	var apiHandler;

    function login_callback() {

        console.log( "Successful login" );

        // @note: On login completion, fetch all installations.
        apiHandler.fetchInstallations();
    }

    function logout_callback() {
        console.log( "Successful logout" );
    }

    function get_installations_callback() {

        console.log( "Successful fetched installations" );

        // @note: Get all installations just fetched.
        var installs = apiHandler.getInstallations();

        console.log( installs );

        /*var installationArgs = {
            type: "live_feed",
            //start: (new Date(2019, 10, 24, 0, 0, 0)).getUnixTime(),
            start: ((new Date(document.getElementById("start").value).getUnixTime())),
            //end: (new Date(2019, 10, 24, 24, 0, 0)).getUnixTime(),
            end: ((new Date(document.getElementById("end").value).getUnixTime())),
            interval: "hours"
        };
        console.log(installationArgs.start);

        var i = 0;

        // @note: Fetch each installation data.
        while(i<installs.length){
            apiHandler.fetchInstallationData( installs[0].idSite, installationArgs );
            i += 1;
        }*/
    }

    function get_installations_data_callback( site_id, site_data ) {

        console.log( "\n*****" );
        console.log( "Successful fetched installation data" );
        console.log( "Site Id:", site_id );
        console.log( "Site Data:", site_data );
        console.log( "Site Data Records:", site_data.records );
        console.log( "Site Data Totals:", site_data.totals );
        console.log( "*****" );

        WriteValues(site_data);

    }

    apiHandler = new VrmApiHandler(login_callback, logout_callback, get_installations_callback, get_installations_data_callback);

    // @note: Static username and password.
    // apiHandler.login("communityenergyriver@gmail.com", "1234567890");
    apiHandler.login();
}

class Monitoring extends _PageComponent {

	constructor(props){
		super(props);
		this.requestsHandler = null;
	}

	componentDidMount(){
		this.requestsHandler = requestsHandler();
	}

    render() {
        return <Content>
					<h1>{ ApplicationStore.get('title') }</h1>
                    {/*<Chart1/>
                    <Chart2/>*/}
                    {/*<Chart3/>
                    <Chart4/>
                    <Chart5/>
                    <Chart6/>
                    <Chart7/>*/}
				</Content>;
    }
}

export default Monitoring;
