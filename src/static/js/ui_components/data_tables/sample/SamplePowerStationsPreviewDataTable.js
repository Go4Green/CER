import React from 'react';
import _BasePreviewDataTable from '../_BasePreviewDataTable';

class SamplePowerStationsPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_power_stations";
		this.state.listener = "sample_power_stations_load";
		this.state.className = "sample-power-stations-table data-visual numeric-aa";
	}
}

export default SamplePowerStationsPreviewDataTable;
