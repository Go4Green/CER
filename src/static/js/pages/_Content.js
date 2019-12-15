import React from 'react';

class Content extends React.PureComponent {

	render(){
		return <div className="content">{ this.props.children || null }</div>;
	}
}

export default Content;
