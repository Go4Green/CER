import React from 'react';
import _BaseDataTable from './_BaseDataTable';

class PowerConsumersDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "power_consumers";
		this.state.listener = "power_consumers_load";
		this.state.className = "power-consumers-table data-visual numeric-aa";
	}
}

export default PowerConsumersDataTable;
