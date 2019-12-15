import React from 'react';

import ApplicationStore from '../ApplicationStore';
import * as ApplicationActions from '../ApplicationActions';

class TableRow extends React.PureComponent {

	constructor(props){

		super(props);

	    this.state = {
	    	columns: null,
	    };
	}

	static getDerivedStateFromProps(nextProps, prevState) {

		const cols = nextProps.columns;

		if( cols && cols.length ){
			
			prevState.columns = [];

		    let i = 0;
		    while( i < cols.length ){
		    	prevState.columns.push( <TableColumn key={i}>{ cols[i] }</TableColumn> );
		    	i += 1;
		    }
		}

		return prevState;
	}

	render(){
		return this.state.columns ? <div className="table-row">{ this.state.columns }</div> : null;
	}
}

class TableColumn extends React.PureComponent {
	
	render(){
		
		let children = null;

		switch( typeof this.props.children ){
			case 'string':
			case 'number':
				children = this.props.children;
				break;
			case 'boolean':
				children = this.props.children ? "NAI" : "OXI";
				break;
			default:
				if( null !== this.props.children ){
					if( this.props.children.hasOwnProperty('props') ){
						children = this.props.children;
						break;
					}
				}
				children = 'n/a';
		}

		return <div className="table-col">{ children }</div>;
	}
}

class TableHead extends React.PureComponent {

	constructor(props){
		super(props);
	}

	render(){
		return <div className="table-head"><TableRow columns={this.props.columns} /></div>;
	}
}

class TableBody extends React.PureComponent {

	constructor(props){

		super(props);

	    this.state = {
	    	rows: null,
	    };
	}

	static getDerivedStateFromProps(nextProps, prevState) {

		const rows = nextProps.rows;

		if( rows && rows.length ){
			
			prevState.rows = [];

		    let i = 0;
		    while( i < rows.length ){
		    	prevState.rows.push( <TableRow key={i} columns={rows[i]} /> );
		    	i += 1;
		    }
		}

		return prevState;
	}

	render(){
		return <div className="table-body">{ this.state.rows }</div>;
	}
}

class TablePagination extends React.PureComponent {

	constructor(props){
		super(props);
	    this.state = {
	    	pages: null,
	    };
	}

	static getDerivedStateFromProps(nextProps, prevState) {

		const pages = nextProps.pages;

		if( pages && pages.length ){

			prevState.pages = [];

		    let i = 0;
		    while( i < pages.length ){
		    	if( pages[i].active ){
		    		prevState.pages.push( <button key={i+"-active"} className="btn active" title={ "Σελίδα: " + pages[i].title }>{ pages[i].title }</button> );
		    	}
		    	else{
		    		prevState.pages.push( <button key={i} onClick={ function(ev){
		    			ev.preventDefault();
		    			ev.stopPropagation();
		    			nextProps.onClick( ev.target.getAttribute('data-page') );
		    		} } data-page={ i } className="btn" title={ "Σελίδα: " + pages[i].title }>{ pages[i].title }</button> );
		    	}		    	
		    	i += 1;
		    }
		}

		return prevState;
	}

	render(){
		return <div className="table-pagination">{ this.state.pages }</div>;
	}
}

class Table extends React.PureComponent{

	constructor(props){
		
		super(props);

		this.state = {
			headers: props.headers,
			body: props.body,
			pages: props.pages,
			enablePagin: props.enablePagin
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		prevState.headers = nextProps.headers;
		prevState.body = nextProps.body;
		prevState.pages = nextProps.pages;
		return prevState;
	}

	componentDidUpdate(prevProps, prevState) {}

	render(){
		return <div className="table-wrapper">
					<div className={ "table" + ( 'string' === typeof this.props.className ? " " + this.props.className : "" ) }>
						<TableHead columns={ this.state.headers } />
						<TableBody rows={ this.state.body } />
					</div>
					{ this.state.enablePagin ? <TablePagination pages={ this.state.pages } onClick={ this.props.onPaginClick } enablePagin={ this.state.enablePagin } /> : false }
				</div>;
	}
}

export default Table;
