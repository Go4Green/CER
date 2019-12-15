import React from 'react';
import _BaseDataTable from '../_BaseDataTable';

class SampleSupplierPowerStationsDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_suppliers_power_stations";
		this.state.listener = "sample_suppliers_power_stations_load";
		this.state.className = "sample-suppliers-power-stations-table data-visual numeric-aa";
	}
}

export default SampleSupplierPowerStationsDataTable;
