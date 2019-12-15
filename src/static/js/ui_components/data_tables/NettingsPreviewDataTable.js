import React from 'react';
import _BasePreviewDataTable from './_BasePreviewDataTable';

class NettingsPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "nettings";
		this.state.listener = "nettings_load";
		this.state.className = "nettings-table data-visual numeric-aa";
	}
}

export default NettingsPreviewDataTable;
