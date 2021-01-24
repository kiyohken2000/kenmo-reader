import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, StatusBar } from 'react-native';
import HTML, {domNodeToHTMLString} from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';
import { largeClassesStyles, middleClassesStyles, middleTagsStyles, largeTagsStyles } from './style';
import {iframe, table} from '@native-html/iframe-plugin';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage'
import { IGNORED_TAGS } from 'react-native-render-html'
import * as Haptics from 'expo-haptics';

const storage = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: false,
});
global.storage = storage;

export default class Article extends React.Component {

	constructor() {
    super();
    this.state = {
      largeFont: false,
    }
	}
	
	toggleFont = () => {
		AsyncStorage.setItem('fontSize',JSON.stringify(this.state.largeFont));
		this.setState({ largeFont: !this.state.largeFont });
	}

	componentDidMount() {
		AsyncStorage.getItem('fontSize').then((value) => {
			const fontsize = JSON.parse(value)
			this.setState({largeFont: !fontsize})
		 });
	}

	render() {
		const defaultStyle = this.state.largeFont
		const defaultClass = this.state.largeFont
		const content = this.props.route.params.content
		const url = this.props.route.params.url
		const title = this.props.route.params.title
		const arrival = this.props.route.params.from
		const date = this.props.route.params.date

		function youtube_parser(url) {
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
			var match = url.match(regExp);
			return match && match[7].length == 11 ? match[7] : false;
		}

		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<View style={styles.content}>
					<ScrollView contentContainerStyle={styles.scrollContentContainer}>
						<Text style={styles.paragraph}>
							{title}
						</Text>
						<HTML
							source={{ html:content }}
							classesStyles={defaultClass ? largeClassesStyles : middleClassesStyles}
							tagsStyles={defaultStyle ? largeTagsStyles : middleTagsStyles}
							renderers={{
								iframe: (htmlAttribs, passProps) => {
									const video_id = youtube_parser(htmlAttribs.src);
									return (
										<View
											key={passProps.key}
											style={{
												width: "100%",
												aspectRatio: 16.0 / 9.0,
												marginTop: 16,
												marginBottom: 16,
											}}>
											<WebView
												scrollEnabled={false}
												source={{ uri: htmlAttribs.src }}
												style={{ flex: 1, width: "100%", aspectRatio: 16.0 / 9.0 }}
											/>
										</View>
									);
								},
							}}
						/>
					</ScrollView>
				</View>
				<View style={styles.Overlay}>
					<View style={{ flexDirection: 'row'}}>
						{arrival ?
						<View style={{ position: 'absolute', right: 120 }}>
							<TouchableOpacity
								onPress={() => {
									var archiveData = {
										title: title,
										url: url,
										date: date,
										content: content
									}
									global.storage.save({
										key: 'archive',
										id: title,
										data: archiveData,
									});
									Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
								}}
							> 
								<Icon name="inbox" size={30} color="black"/>
							</TouchableOpacity>
						</View>
						:
						<View style={{ position: 'absolute', right: 120 }}>
							<TouchableOpacity
								onPress={() => {
									global.storage.remove({
										key: 'archive',
										id: title,
									});
									Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
									this.props.navigation.goBack()
								}}
							> 
								<Icon name="trash" size={30} color="black"/>
							</TouchableOpacity>
						</View>
						}
						<View style={{ position: 'absolute', right: 60 }}>
							<TouchableOpacity onPress={() => this.toggleFont()}> 
								<Icon name="type" size={30} color="black"/>
							</TouchableOpacity>
						</View>
						<View style={{ position: 'absolute', right: 0 }}>
							<TouchableOpacity 
								onPress={ ()=>{ Linking.openURL(url)}}
							>
								<Icon name="external-link" size={30} color="black"/>
							</TouchableOpacity>
						</View>
					</View>
        </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 90,
	},
	Overlay: {
    flex: 1,
    position: "absolute",
    opacity: 1.0,
    bottom: 60,
    right: 35,
    justifyContent: "center",
	},
	paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});