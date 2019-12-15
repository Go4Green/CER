import React from 'react';
import _BasePreviewDataTable from './_BasePreviewDataTable';

class SuppliersPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "suppliers";
		this.state.listener = "suppliers_load";
		this.state.className = "suppliers-table data-visual numeric-aa";
	}
}

export default SuppliersPreviewDataTable;
