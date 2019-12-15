import React from 'react';
import _BasePreviewDataTable from '../_BasePreviewDataTable';

class SamplePowerConsumersPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_power_consumers";
		this.state.listener = "sample_power_consumers_load";
		this.state.className = "sample-power-consumers-table data-visual numeric-aa";
	}
}

export default SamplePowerConsumersPreviewDataTable;
