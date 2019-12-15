import React from 'react';
import _BaseDataTable from './_BaseDataTable';

class PersonsDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "persons";
		this.state.listener = "persons_load";
		this.state.className = "persons-table data-visual numeric-aa";
	}
}

export default PersonsDataTable;
