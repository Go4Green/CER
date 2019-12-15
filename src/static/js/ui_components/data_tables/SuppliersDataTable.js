import React from 'react';
import _BaseDataTable from './_BaseDataTable';

class SuppliersDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "suppliers";
		this.state.listener = "suppliers_load";
		this.state.className = "suppliers-table data-visual numeric-aa";
	}
}

export default SuppliersDataTable;
