import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import HTML from 'react-native-render-html';

export default class Article extends React.Component {
	render() {
		// const { params } = this.props.navigation.state;
		const url = this.props.route.params.url
		return (
			<View>
				<StatusBar barStyle="light-content" />
				<Text>{url}</Text>
				<HTML
          html={url}
        />
			</View>
		);
	}
}