import React from 'react';
import _BasePreviewDataTable from './_BasePreviewDataTable';

class UsersPreviewDataTable extends _BasePreviewDataTable {

	constructor(props){
		super(props);
		this.state.request = "users";
		this.state.listener = "users_load";
		this.state.className = "users-table data-visual numeric-aa";
	}
}

export default UsersPreviewDataTable;
