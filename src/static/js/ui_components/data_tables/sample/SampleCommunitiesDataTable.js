import React from 'react';
import _BaseDataTable from '../_BaseDataTable';

class SampleCommunitiesDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_communities";
		this.state.listener = "sample_communities_load";
		this.state.className = "sample-communities-table data-visual numeric-aa";
	}
}

export default SampleCommunitiesDataTable;
