import React from 'react';
import _BaseDataTable from './_BaseDataTable';

class UsersDataTable extends _BaseDataTable {

	constructor(props){
		super(props);
		this.state.request = "users";
		this.state.listener = "users_load";
		this.state.className = "users-table data-visual numeric-aa";
	}
}

export default UsersDataTable;
