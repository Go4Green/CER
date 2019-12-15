import React from 'react';
import ApplicationStore from '../../ApplicationStore';
import _BaseDataTable from './_BaseDataTable';

class _BasePreviewDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.size = 5;
		// this.state.size = 2;
		this.state.enablePagin = true;
		this.state.tableType = "preview";
	}
}

export default _BasePreviewDataTable;
