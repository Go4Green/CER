import React from 'react';
import _BasePreviewDataTable from './_BasePreviewDataTable';

class PersonsPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "persons";
		this.state.listener = "persons_load";
		this.state.className = "persons-table data-visual numeric-aa";
	}
}

export default PersonsPreviewDataTable;
