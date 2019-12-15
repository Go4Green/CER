import React from 'react';
import _BasePreviewDataTable from './_BasePreviewDataTable';

class CommunitiesPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "communities";
		this.state.listener = "communities_load";
		this.state.className = "communities-table data-visual numeric-aa";
	}
}

export default CommunitiesPreviewDataTable;
