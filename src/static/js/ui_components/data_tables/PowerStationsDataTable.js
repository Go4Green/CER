import React from 'react';
import _BaseDataTable from './_BaseDataTable';

class PowerStationsDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "power_stations";
		this.state.listener = "power_stations_load";
		this.state.className = "power-stations-table data-visual numeric-aa";
	}
}

export default PowerStationsDataTable;
