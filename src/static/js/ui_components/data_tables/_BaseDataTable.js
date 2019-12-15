import React from 'react';
import ApplicationStore from '../../ApplicationStore';
import _ResponseDataTable from './_ResponseDataTable';

class _BaseDataTable extends React.PureComponent {

	constructor(props){

		super(props);

		this.state = {
			// size: null,
			// size: 10,
			size: 5,
			page: null,
			order: null,
			/*size: 20,
			page: 0,
			order: "",*/
			request: null,
			listener: null,
			className: null,
			enablePagin: true,
			onPaginClick: this.onPaginClick.bind(this),
			tableType: "default",
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {

		const newState = {};

		if( prevState.request ){

			const requests_cache_prefix = "REQUEST:" + prevState.request + "[" + prevState.tableType + "]";
			const page = ApplicationStore.get_cache( requests_cache_prefix + "[page]" );

			if( void 0 !== page && null !== page ){
				newState.page = parseInt( page, 10 );
			}
		}

		return newState;
	}

	onPaginClick(page){
		
		const requests_cache_prefix = "REQUEST:" + this.state.request + "[" + this.state.tableType + "]";
		ApplicationStore.set_cache( requests_cache_prefix + "[page]", page );

		ApplicationStore.request( this.state.request, this.state.size, page );
	}

	render(){
		return <_ResponseDataTable 
					size={ this.state.size }
					page={ this.state.page }
					order={ this.state.order }
					request={ this.state.request } 
					listener={ this.state.listener }
					className={ this.state.className } 
					enablePagin={ this.state.enablePagin } 
					onPaginClick={ this.state.onPaginClick }
					tableType={ this.state.tableType } />;
	}

}

export default _BaseDataTable;
