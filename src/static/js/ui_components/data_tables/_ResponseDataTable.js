import React from 'react';
import ApplicationStore from '../../ApplicationStore';
import Table from '../Table';

class ResponseDataTable extends React.PureComponent {

	constructor(props){

		super(props);

		this.state = {
			headers: null,
			body: null,
			pages:null,
			enablePagin: !! props.enablePagin,
		};

		this.onDataLoad = this.onDataLoad.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		prevState.enablePagin = !! nextProps.enablePagin;
		return prevState;
	}

	componentDidMount() {
		ApplicationStore.on( this.props.listener, this.onDataLoad );
		ApplicationStore.request( this.props.request, this.props.size, this.props.page, this.props.order );
	}

	componentWillUnmount() {
		ApplicationStore.removeListener( this.props.listener, this.onDataLoad );
	}

	onDataLoad( data ){

		const list_data = data.list;
		const page_data = data.page;
		const headers_data = data.headers;
		const columns_data = data.columns;
		const values_data = data.values;
		const page_index_shift = page_data.size * page_data.number;

		let body = [];
		let headers = [];
		let pages = null;

		if( list_data.length ){

			let i, j, k;
			let fields;
			let content;
			let all_headers = Object.keys( list_data[0] );

			if( !! columns_data && columns_data.length ){

				headers.push("α/α");

				i = 0;
				while( i < columns_data.length ){
					headers.push( void 0 !== headers_data[ columns_data[i] ] ? headers_data[ columns_data[i] ] : columns_data[i] );
					i += 1;
				}

				i = 0;
				while( i < list_data.length ){

					fields = [ page_index_shift + i + 1 ];

					j = 0;
					while( j < columns_data.length ){

						k = columns_data[j];

						content = list_data[i][k];
						
						if( !! values_data && !! values_data[k] ){

							switch( typeof values_data[k] ){
								case 'string':
								case 'number':
								case 'boolean':
									content = values_data[k];
									break;
								case 'function':
									content = values_data[k]( list_data[i] );
									break;
							}
						}

						fields.push( content );
						
						j += 1;
					}

					body[ body.length ] = fields;
					
					i += 1;
				}
			}
			else{

				headers = [ "α/α" ].concat( all_headers );

				if( !! headers_data && Object.keys( headers_data ).length ){

					i = 0;
					while( i < headers.length ){

						if( void 0 !== headers_data[ headers[i] ] ){
							headers[i] = headers_data[ headers[i] ];
						}

						i += 1;
					}
				}

				i = 0;
				while( i < list_data.length ){

					fields = [ page_index_shift + i + 1 ];

					for(k in list_data[i]){
					
						if( list_data[i].hasOwnProperty(k) ){

							content = list_data[i][k];

							if( !! values_data && !! values_data[k] ){

								switch( typeof values_data[k] ){
									case 'string':
									case 'number':
									case 'boolean':
										content = values_data[k];
										break;
									case 'function':
										content = values_data[k]( list_data[i] );
										break;
								}
							}

							fields.push( content );
						}
					}

					body[ body.length ] = fields;

					i += 1;
				}
			}

			if( this.state.enablePagin && 1 < page_data.totalPages ){

				pages = [];

				i = 0;
				while(i < page_data.totalPages){					
					
					pages.push({
						title: i + 1,
						active: i === page_data.number,
					});

					i += 1;
				}
			}
		}

		this.setState({
			headers: headers,
			body: body,
			pages: pages,
		});
	}

	render(){
		return this.state.body && this.state.body.length ? <Table headers={ this.state.headers } body={ this.state.body } pages={ this.state.pages } onPaginClick={ this.props.onPaginClick } enablePagin={ this.state.enablePagin } className={ this.props.className } /> : null;
	}

}

export default ResponseDataTable;
