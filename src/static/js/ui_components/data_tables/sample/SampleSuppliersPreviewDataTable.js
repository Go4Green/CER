import React from 'react';
import _BasePreviewDataTable from '../_BasePreviewDataTable';

class SuppliersPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_suppliers";
		this.state.listener = "sample_suppliers_load";
		this.state.className = "sample-suppliers-table data-visual numeric-aa";
	}
}

export default SuppliersPreviewDataTable;
