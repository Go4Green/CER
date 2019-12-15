import React from 'react';
import _BaseDataTable from '../_BaseDataTable';

class SamplePersonsDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_persons";
		this.state.listener = "sample_persons_load";
		this.state.className = "sample-persons-table data-visual numeric-aa";
	}
}

export default SamplePersonsDataTable;
