import React from 'react';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

export default class Article extends React.Component {

	/*constructor(props) {
		super(props);
		this.state = {data: null};
}*/

/*componentDidMount() {
	fetch(this.props.route.params.url)
		.then((response) => response.text())
		.then((responseText) => 
			this.setState({ 
				html: responseText,
			})
		)
		.catch((error) => {
			console.error(error);
		});
}*/

	render() {
		// const htmlContent = this.state.html
		// const url = this.props.route.params.url
		const content = this.props.route.params.content
		return (
			<ScrollView>
				<StatusBar barStyle="light-content" />
				<HTML source={{ html:content }} />
				{/*<HTML source={{ html:htmlContent }} />*/}
			</ScrollView>
		);
	}
}