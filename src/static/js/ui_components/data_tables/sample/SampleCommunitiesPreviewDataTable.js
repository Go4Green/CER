import React from 'react';
import _BasePreviewDataTable from '../_BasePreviewDataTable';

class SampleCommunitiesPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "sample_communities";
		this.state.listener = "sample_communities_load";
		this.state.className = "sample-communities-table data-visual numeric-aa";
	}
}

export default SampleCommunitiesPreviewDataTable;
