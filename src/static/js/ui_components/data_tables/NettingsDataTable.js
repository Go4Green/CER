import React from 'react';
import _BaseDataTable from './_BaseDataTable';

class NettingsDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "nettings";
		this.state.listener = "nettings_load";
		this.state.className = "nettings-table data-visual numeric-aa";
	}
}

export default NettingsDataTable;
