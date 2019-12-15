import React from 'react';
import _BaseDataTable from '../_BaseDataTable';

class SampleSupplierPowerConsumersDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_suppliers_power_consumers";
		this.state.listener = "sample_suppliers_power_consumers_load";
		this.state.className = "sample-suppliers-power-consumers-table data-visual numeric-aa";
	}
}

export default SampleSupplierPowerConsumersDataTable;
