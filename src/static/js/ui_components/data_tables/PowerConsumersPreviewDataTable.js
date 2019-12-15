import React from 'react';
import _BasePreviewDataTable from './_BasePreviewDataTable';

class PowerConsumersPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "power_consumers";
		this.state.listener = "power_consumers_load";
		this.state.className = "power-consumers-table data-visual numeric-aa";
	}
}

export default PowerConsumersPreviewDataTable;
