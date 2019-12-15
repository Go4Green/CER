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

Date.prototype.getUnixTime = function() { return this.getTime() / 1000 | 0 };

var globalData;

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + '00';
  return time;
}

function create2Darray (k){
    var i;
  var d = new Array(2);
  for (i=0;i<(k+1);i++) {
    d[i] = new Array(2);
  }
  return d;
}

function drawChart() {
    var data = google.visualization.arrayToDataTable(globalData);

    var options = {
      title: 'Solar Power / Area = Energy',
      //hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
      //vAxis: {minValue: 0}
    };

    var chart = new google.visualization.SteppedAreaChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }

function requestsHandler(){

    var siteId;

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

        siteId = installs[2].idSite;

        refreshChart();
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

    function refreshChart(){

        console.warn( siteId );

        var installationArgs = {
            type: "live_feed",
            //start: (new Date(2019, 10, 24, 0, 0, 0)).getUnixTime(),
            start: ((new Date(document.getElementById("start").value).getUnixTime())),
            //end: (new Date(2019, 10, 24, 24, 0, 0)).getUnixTime(),
            end: ((new Date(document.getElementById("end").value).getUnixTime())),
            interval: "hours"
        };
        // console.log(installationArgs);

        // console.log(installs[2].idSite);

        apiHandler.fetchInstallationData( siteId, installationArgs );

        /*var i = 0;

        // @note: Fetch each installation data.
        while(i<installs.length){
            apiHandler.fetchInstallationData( installs[0].idSite, installationArgs );
            i += 1;
        }*/
    }

    function WriteValues (data){
        var hours =( ( new Date(document.getElementById("end").value).getUnixTime())-(new Date(document.getElementById("start").value).getUnixTime()))/3600;
        var g= create2Darray(hours);
        var i;
      //console.log(g);
      document.getElementById("maro").innerHTML=((data.totals.total_solar_yield).toFixed(2));
      g[0][0]="Hour";
      g[0][1]="Power (W)";
      for (i=1;i<hours+1;i++) {
        g[i][0]=timeConverter(((data.records.Pdc[i-1][0])/1000));
        g[i][1]=data.records.Pdc[i-1][1];

      }
      globalData=g;
      //console.log(globalData);
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
    }

    apiHandler = new VrmApiHandler(login_callback, logout_callback, get_installations_callback, get_installations_data_callback);

    // @note: Static username and password.
    // apiHandler.login("communityenergyriver@gmail.com", "1234567890");
    apiHandler.login();

    return{
        rerun: function(){
            apiHandler.login();
        },
        // refreshChart: refreshChart,
    };
}

class Monitoring extends _PageComponent {

	constructor(props){
		super(props);
		this.requestsHandler = null;

        this.state = {
            startData: "2019-11-24T00:00:00.00",
            endData: "2019-11-25T00:00:00.00",
        };

        this.showDate = this.showDate.bind(this);
	}

	componentDidMount(){
		this.requestsHandler = requestsHandler();
	}

    showDate(event){

        switch( event.target.id ){
            case "start":
                this.setState({
                    startData: event.target.value,
                });
                break;
            case "end":
                this.setState({
                    endData: event.target.value,
                });
                break;
        }

        this.requestsHandler = requestsHandler();
    }

    render() {
        return <Content>
					
                    <h1>{ ApplicationStore.get('title') }</h1>
                    
                    <div id="ContainerDates">
                        
                        <div id="maro2">
                            Αρχή Διαστήματος: <span style={{ whiteSpace:"pre" }}> &#9;</span><input id="start" type="datetime-local" value={ this.state.startData } step="3600" onChange={ this.showDate } max="2030-12-31T12:00:00.00" />
                            <br/>
                            <br/>
                            Τέλος Διαστήματος: <span style={{ whiteSpace:"pre" }}>&#9;</span><input id="end" type="datetime-local" value={ this.state.endData } step="3600" onChange={ this.showDate } max="2030-12-31T12:00:00.00" />
                        </div>
                        <br/>
                        Η συνολική ενέργεια για αυτό το διάστημα είναι: <span id="maro" style={{ fontWeight:"bold" }}> </span> kWh!

                    </div>

                    {/*<div id="curve_chart" style={ width: "100%", height: "500px"; margin-right:auto; margin-left:auto }></div>*/}
                    {<div id="curve_chart"></div>}

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
