import React from 'react';
import _BasePreviewDataTable from '../_BasePreviewDataTable';

class SamplePersonsPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_persons";
		this.state.listener = "sample_persons_load";
		this.state.className = "sample-persons-table data-visual numeric-aa";
	}
}

export default SamplePersonsPreviewDataTable;
