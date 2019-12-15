import React from 'react';
import _BaseDataTable from './_BaseDataTable';

class CommunitiesDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "communities";
		this.state.listener = "communities_load";
		this.state.className = "communities-table data-visual numeric-aa";
	}
}

export default CommunitiesDataTable;
