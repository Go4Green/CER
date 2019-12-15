import React from 'react';

import ApplicationStore from '../ApplicationStore';

import _PageComponent from './_PageComponent';

import Content from './_Content';

class Investment extends _PageComponent {

    constructor(props) {

        super(props);

        this.state = {
            visibleOptions: true,
            visiblePaymentOption: false,
            visibleMetering: false,
            visibleNetMetering: false,
            productionEstimation: "AverageGreece",
            valueOf_Production: 0,
            valueOf_Dimension: 0,
            valueOf_Size: 0,
            valueOf_Cost: 0,
            valueOf_CostkWp: 1000,
            valueOf_AreakWp: 10,
            valueOf_AveragekWp: 1500,
            display_parameters: false,
            valueOf_PricekWh: "0.11056",
            valueOf_PriceGrid: "0.05054",
            valueOf_HouseConsumption: "3758",
            valueOf_PercentageSC: "35",
            valueOf_YearRevenue: void 0, 
            valueOf_PaybackPeriod: void 0,
            valueOf_RelationPC: void 0,
        };

        this.state.valueOf_Production = this.state.valueOf_Dimension * this.state.valueOf_AveragekWp;

        this.onClickCapital = this.onClickCapital.bind(this);
        this.onClickLand = this.onClickLand.bind(this);
        this.onClickSize = this.onClickSize.bind(this);
        this.onClickInvestment = this.onClickInvestment.bind(this);
        this.onClickSelfConsumption = this.onClickSelfConsumption.bind(this);
        this.onClickToGrid = this.onClickToGrid.bind(this);
        this.onClickNetMetering = this.onClickNetMetering.bind(this);
        this.onClickVirtualNetMetering = this.onClickVirtualNetMetering.bind(this);
        this.netMeteringCalc = this.netMeteringCalc.bind(this);
        this.onProductionEstimationChange = this.onProductionEstimationChange.bind(this);
        this.onClickDisplayParameters = this.onClickDisplayParameters.bind(this);
        this.calcRevenue = this.calcRevenue.bind(this);
    }

    /************************/

    onClickCapital() {
        console.info("Clicked capital");
    }

    onClickLand() {
        console.info("Clicked land");
    }

    onClickSize() {
        console.info("Clicked size");
    }

    onClickInvestment() {
        this.setState({
            visibleOptions: false,
            visiblePaymentOption: true,
        });
    }

    /************************/

    onClickSelfConsumption() {
        this.setState({
            visibleMetering: true,
            visiblePaymentOption: false,
        });
    }

    onClickToGrid() {
        console.info("Clicked to grid");
    }

    /************************/

    onClickNetMetering() {
        this.setState({
            visibleNetMetering: true,
        });
    }

    onClickVirtualNetMetering() {
        console.info("Clicked virtual net metering");
    }

    /************************/

    netMeteringCalc(event) {

        let dimension_val = null;
        let cost_val = null;
        let size_val = null;

        let prev_dimension_val = this.state.valueOf_Dimension;
        let prev_cost_val = this.state.valueOf_Cost;
        let prev_size_val = this.state.valueOf_Size;
        let prev_areakWp_val = this.state.valueOf_AreakWp;
        let prev_costkWp_val = this.state.valueOf_CostkWp;

        switch (event.target.id) {
            case "Dimension":
                dimension_val = 1 * event.target.value.trim();
                size_val = prev_areakWp_val * dimension_val;
                cost_val = prev_costkWp_val * dimension_val;
                break;
            case "Size":
                size_val = 1 * event.target.value.trim();
                dimension_val = size_val ? event.target.value / prev_areakWp_val : prev_dimension_val;
                cost_val = size_val ? prev_costkWp_val * (size_val / prev_areakWp_val) : prev_costkWp_val;
                break;
            case "Cost":
                cost_val = 1 * event.target.value.trim();
                dimension_val = cost_val ? cost_val / prev_costkWp_val : prev_dimension_val;
                size_val = cost_val ? prev_areakWp_val * (cost_val / prev_costkWp_val) : prev_size_val;
                break;
        }

        this.setState({
            valueOf_Dimension: 0 + dimension_val,
            valueOf_Size: 0 + size_val,
            valueOf_Cost: 0 + cost_val,
        }, function() {
            this.updateValueOf_Production();
        });
    }

    /************************/

    onProductionEstimationChange(event) {
        this.setState({
                productionEstimation: event.target.value
            },
            function() {
                this.updateValueOf_Production();
            });
    }

    updateValueOf_Production() {
    	
    	if ("AverageGreece" === this.state.productionEstimation) {
            this.setState({
                valueOf_Production: this.state.valueOf_Dimension * this.state.valueOf_AveragekWp
            }, function(){
            	this.onCalcRevenue();
            });
        }
        else{
        	this.onCalcRevenue();
        }
    }

    /************************/

    onClickDisplayParameters(event) {
        this.setState({
            display_parameters: !this.state.display_parameters,
        });
    }

    onCalcRevenue(){

        var pricekWh = this.state.valueOf_PricekWh;
        var priceGrid = this.state.valueOf_PriceGrid;
        var houseCons = this.state.valueOf_HouseConsumption;
        var production = this.state.valueOf_Production;

        production = !! production ? 1 * production : 0;
        priceGrid = !! priceGrid ? 1 * priceGrid : 0;
        pricekWh = !! pricekWh ? 1 * pricekWh : 0;

        var relationPC = 100 * ( ( houseCons || 0 ) / ( production || 1 ) ).toFixed(2);
        var cost = this.state.valueOf_Cost;

        var percent = ( this.state.valueOf_PercentageSC || 0 ) / 100;

        if (relationPC < 80) {

        	this.setState({
	        	valueOf_RelationPC: relationPC,
	        }, function(){
	        	document.getElementById("Warning").style.visibility = "visible";
	        });

        } else {

        	var yearlyRevenue = production * (pricekWh + ( percent * priceGrid ) );

        	// console.log( yearlyRevenue, production, pricekWh, percent, priceGrid );

        	this.setState({
        		valueOf_RelationPC: relationPC,
        		valueOf_YearRevenue: yearlyRevenue.toFixed(2), 
            	valueOf_PaybackPeriod: (cost / (yearlyRevenue.toFixed(2))).toFixed(1),
        	});
        }

        

        // document.getElementById("RelationPC").value = ;
    }

    calcRevenue( event ) {

    	switch( event.target.id ){
    		case "PercentageSC":
    			this.setState({
		    		valueOf_PercentageSC: 1 * event.target.value 
		    	}, this.onCalcRevenue );
    			break;
    		case "HouseConsumption":
    			this.setState({
		    		valueOf_HouseConsumption: event.target.value 
		    	}, this.onCalcRevenue );
    			break;
    	}
    }

    render() {

        return <Content>
					
					<h1>{ ApplicationStore.get('title') }</h1>

					<p> Επιλογή Έναρξης Διερεύνησης Επένδυσης Φωτοβολταϊκού Συστήματος</p>
				  
				  	{ this.state.visibleOptions ? <div id="Options">
				    	<button onClick={ this.onClickCapital }>Διαθέσιμο Κεφάλαιο</button>
				    	<button onClick={ this.onClickLand }>Διαθέσιμος Χώρος</button>
				    	<button onClick={ this.onClickSize }>Μέγεθος Φωτοβολταϊκού Πάρκου</button>
				    	<button onClick={ this.onClickInvestment }>Τρόπος Αποπληρωμής</button>
				  	</div> : null }

				  	{ this.state.visiblePaymentOption ? <div id="PaymentOption">
				    	<button onClick={ this.onClickSelfConsumption }>Αυτοπαραγωγή/Αυτοκατανάλωση Ενέργειας</button>
				    	<button onClick={ this.onClickToGrid }>Πώληση στο Δίκτυο</button>
				  	</div> : null }

				  	{ this.state.visibleMetering ? <div id="Metering">
				    	<button onClick={ this.onClickNetMetering }> Ενεργειακός Συμψηφισμός</button>
				    	<button onClick={ this.onClickVirtualNetMetering }> Εικονικός Ενεργειακός Συμψηφισμός</button>
				  	</div> : null }
				  
				  	{ this.state.visibleNetMetering ? <div id="NetMetering">

				    	{/*<input type="range" name="percentageSelfConsumption" min="80" max="100" defaultValue="100" />
				    	<br/>*/}

				    	Ονομαστική Ισχύς Φωτοβολταϊκού Συστήματος <input type="text" id="Dimension" placeholder="kWp" value={ this.state.valueOf_Dimension } onChange={ this.netMeteringCalc } />kWp
				    	<br/>

				    	Επιφάνεια Φωτοβολταϊκού Συστήματος <input type="text" id="Size" placeholder="m&sup2;" value={ this.state.valueOf_Size } onChange={ this.netMeteringCalc } />m<sup>2</sup>
				    	<br/>

				    	Κόστος Φωτοβολταϊκού Συστήματος <input type="text" id="Cost" placeholder="&euro;" value={ this.state.valueOf_Cost } onChange={ this.netMeteringCalc } />&euro;
				    	<br/>
				    	
				    	Εκτίμηση Παραγωγής Φωτοβολταϊκού Συστήματος <input type="number" id="Production" placeholder="kWh" value={ this.state.valueOf_Production } readOnly />kWh
				    	<br />

					    Τρόπος Εκτίμησης Παραγωγής:
					    <br />

				    	<input type="radio" value="AverageGreece" onChange={ this.onProductionEstimationChange } checked={ "AverageGreece" === this.state.productionEstimation } />Μέσος Όρος Παραγωγής στον Ελλαδικό Χώρο<br/>
				    	<input type="radio" value="PVGIS" onChange={ this.onProductionEstimationChange } checked={ "PVGIS" === this.state.productionEstimation } />PVGIS<br/>

				    	{ "PVGIS" === this.state.productionEstimation ? <div>
				    		<label>Longitude: <input type="text" defaultValue="32.978" readOnly /></label>
				    		<label>Latitude: <input type="text" defaultValue="23.714" readOnly /></label>
				    	</div> : null }

				    	<input type="radio" value="Solargis" checked={ "Solargis" === this.state.productionEstimation } readOnly />Solargis<br/>
				    	<input type="radio" value="PVoutput" checked={ "PVoutput" === this.state.productionEstimation } readOnly />PVoutput<br/>
				    	<input type="radio" value="AverageAll" checked={ "AverageAll" === this.state.productionEstimation } readOnly />(Μέσος´Ορος) Υπολογισμός όλων<br/>

				    	Αλλαγή παραμέτρων <input type="checkbox" checked={ this.state.display_parameters } onChange={ this.onClickDisplayParameters } /><br/>

				    	{ this.state.display_parameters ?<div className="">
				    		Κόστος Φωτοβολταϊκού Συστήματος ανά kW ονομαστικής ισχύος <input type="number" id="CostkWp" placeholder="kWp" defaultValue={ this.state.valueOf_CostkWp } onChange={ this.onProductionEstimationChange } />&euro;/kWp<br/>				    		Αναγκαία Επιφάνεια Φωτοβολταϊκού Συστήματος ανά kW ονομαστικής ισχύος <input type="number" id="AreakWp" placeholder="m2/kWp" defaultValue={ this.state.valueOf_AreakWp } onChange={ this.onProductionEstimationChange } />m<sup>2</sup>/kWp<br/>
				    		Μέσος όρος Παραγωγης Φωτοβολταϊκού Συστηματος στον ελλαδικό ανά kW ονομαστικής ισχύος <input type="number" id="AveragekWp" placeholder="kWh/kWp" defaultValue={ this.state.valueOf_AveragekWp } onChange={ this.onProductionEstimationChange } />kWh/kWp
					    </div> : null }

				    </div> : null }

				    { this.state.visibleNetMetering ? <div id="Revenues">

					      Επιλογή Παρόχου:
					      <select id="Provider" value={"DEI"} onChange={ this.calcRevenue }>
					        <option value="DEI">ΔΕΗ</option>
					        <option value="Protergia">Protergia</option>
					        <option value="Volterra">Volterra</option>
					        <option value="Volton">Volton</option>
					        <option value="WattVolt">Watt+Volt</option>
					        <option value="Zenith">Ζενίθ</option>
					      </select>
					      <br/>
					      
					      Επιλογή είδους Τιμολογίου:
					      <select id="Type" value={"G1"} onChange={ this.calcRevenue }>
					        <option value="G1">Γ1</option>
					        <option value="G1N">Γ1Ν</option>
					        <option value="G21">Γ21</option>
					        <option value="G21">Γ22</option>
					        <option value="G21">Γ23</option>
					        <option value="G21">ΒΓ</option>
					        <option value="G21">ΒΧ</option>
					        <option value="G21">ΒΥ</option>
					      </select>
					      <br/>

					      Χρεώσεις Προμήθειας: <input type="number" id="PricekWh" value={ this.state.valueOf_PricekWh } readOnly />&euro;/kWh<br/>
					      Ρυθμιζόμενες Χρεώσεις: <input type="number" id="PriceGrid" value={ this.state.valueOf_PriceGrid } readOnly />&euro;/kWh<br/>
					      Εκτιμώμενη Ετήσια Κατανάλωση: <input type="number" id="HouseConsumption" value={ this.state.valueOf_HouseConsumption } onChange={ this.calcRevenue } />kWh<br/>

					      Σχέση Εκτιμώμενης Κατανάλωσης-Παραγωγής: <input type="number" id="RelationPC" defaultValue={ this.state.valueOf_RelationPC } readOnly />%<br/>
					      
					      <div id="Warning" style={{ visibility: "hidden" }}> Προειδοποίηση!!! Η παραγωγή είναι πολύ μεγαλύτερη από την κατανάλωση... <br/>
					        Μέγιστο περιθώριο πώλησης στο δίκτυο --> 20% της παραγωγής!
					      </div>
					      
					      Ποσοστό Ιδιοκατανάλωσης: <input type="range" id="PercentageSC" value={ this.state.valueOf_PercentageSC } min="0" max="100" onChange={ this.calcRevenue } /><span id="Percentage"> { this.state.valueOf_PercentageSC }</span>%<br/>

					      Κέρδος ανά έτος: <input type="number" id="YearRevenue" defaultValue={ this.state.valueOf_YearRevenue } readOnly />&euro; <br/>

					      Περίοδος Αποπληρωμής: <input type="number" placeholder="Έτη" defaultValue={ this.state.valueOf_PaybackPeriod } id="PaybackPeriod" readOnly />έτη<br/>
					      
					  </div> : null }

				</Content>;
    }
}

export default Investment;