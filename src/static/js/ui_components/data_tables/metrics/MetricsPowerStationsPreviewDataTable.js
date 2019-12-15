import React from 'react';
import _BasePreviewDataTable from '../_BasePreviewDataTable';

class MetricsPowerStationsPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "metrics_power_stations";
		this.state.listener = "metrics_power_stations_load";
		this.state.className = "metrics-power-stations-table data-visual numeric-aa";
	}
}

export default MetricsPowerStationsPreviewDataTable;
