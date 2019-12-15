import React from 'react';
import _BaseDataTable from '../_BaseDataTable';

class SuppliersDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_suppliers";
		this.state.listener = "sample_suppliers_load";
		this.state.className = "sample-suppliers-table data-visual numeric-aa";
	}
}

export default SuppliersDataTable;
