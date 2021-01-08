import React from 'react';
import { WebView } from 'react-native';
import { Text, View, StatusBar } from 'react-native';

export default class Article extends React.Component {
	render() {
		// const { params } = this.props.navigation.state;
		return (
			<View>
				<StatusBar barStyle="light-content" />
					<Text>111111111</Text>
					<Text>this is Article</Text>
			{/*<WebView source={{uri: params.url}} />*/}
			</View>
		);
	}
}