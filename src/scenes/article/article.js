import React, { Children } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, StatusBar, Dimensions } from 'react-native';
import HTML, {domNodeToHTMLString} from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';
import { largeClassesStyles, middleClassesStyles, middleTagsStyles, largeTagsStyles } from './style';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage'
import { IGNORED_TAGS } from 'react-native-render-html'
import * as Haptics from 'expo-haptics';
import { Button } from 'galio-framework';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { sites } from '../sites/list'
import dbh from '../../../firebase'

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

		const domain = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
		const site = sites.find((v) => v.domain === domain);

		const date1 = new Date();
		const formatedTitle = title.replace("/", " ")

		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<View style={styles.content}>
					<ScrollView contentContainerStyle={styles.scrollContentContainer}>
						<Text style={styles.paragraph}>
							{title}
						</Text>
						<Text style={styles.site}>{site.name}</Text>
						<HTML
							source={{ html:content }}
							classesStyles={defaultClass ? largeClassesStyles : middleClassesStyles}
							tagsStyles={defaultStyle ? largeTagsStyles : middleTagsStyles}
							baseFontStyle={{ fontFamily: "Roboto", fontSize:defaultStyle ? 20 : 14 }}
							ignoredStyles={["font-family", "letter-spacing"]}
							renderers={{
								iframe: (htmlAttribs, passProps) => {
									if (htmlAttribs.class == 'youtube-player') {
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
										)
									}
								},
								blockquote: (htmlAttribs, children, renderersProps, passProps, domNode) => {
									if (htmlAttribs.class == 'instagram-media') {
										const JS = '<script type="text/javascript" src="https://www.instagram.com/embed.js"></script>'
										const html = domNodeToHTMLString(passProps.domNode)
        						const source = html + JS
										return (
											<AutoHeightWebView
												style={{ width: Dimensions.get('window').width - 15, marginTop: 1 }}
												source={{ html: source}}
												javaScriptEnabled={true}
												scrollEnabled={false}
											/>
										)
									} else if (htmlAttribs.class == 'twitter-tweet') {
										const JS = '<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>'
										const html = domNodeToHTMLString(passProps.domNode)
        						const source = html + JS
										return (
											<AutoHeightWebView
												style={{ width: Dimensions.get('window').width - 15, marginTop: 1 }}
												source={{ html: source}}
												javaScriptEnabled={true}
												scrollEnabled={false}
											/>
										)
									} else {
										return (
											<View style={styles.blockquote}>{children}</View>
										)
									}
								},
							}}
						/>
					</ScrollView>
				</View>
				<View style={styles.Overlay}>
					<View style={{ flexDirection: 'row'}}>
						{arrival ?
							<View style={{ position: 'absolute', right: 120 }}>
								<Button
									onlyIcon
									icon="inbox"
									iconFamily="Feather"
									iconSize={30}
									color="#dda0dd"
									iconColor="black"
									style={{ width: 45, height: 45 }}
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
										dbh.collection("article").doc(formatedTitle).set({
											title:title,
											url: url,
											date: date,
											content: content,
											date1: date1
										})
										Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
									}}
								/>
							</View>
							:
							<View style={{ position: 'absolute', right: 120 }}>
								<Button
									onlyIcon
									icon="trash"
									iconFamily="Feather"
									iconSize={30}
									color="#c0c0c0"
									iconColor="black"
									style={{ width: 45, height: 45 }}
									onPress={() => {
										global.storage.remove({
											key: 'archive',
											id: title,
										});
										Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
										this.props.navigation.goBack()
									}}
								/>
							</View>
						}
						<View style={{ position: 'absolute', right: 60 }}>
							<Button
									onlyIcon
									icon="type"
									iconFamily="Feather"
									iconSize={30}
									color="#b0c4de"
									iconColor="black"
									style={{ width: 45, height: 45 }}
									onPress={() => this.toggleFont()}
							/>
						</View>
						<View style={{ position: 'absolute', right: 0 }}>
							<Button
									onlyIcon
									icon="external-link"
									iconFamily="Feather"
									iconSize={30}
									color="#00ced1"
									iconColor="black"
									style={{ width: 45, height: 45 }}
									onPress={ ()=>{ Linking.openURL(url)}}
							/>
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
    bottom: 70,
    right: 15,
    justifyContent: "center",
	},
	paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
	},
	site: {
    fontSize: 17,
    textAlign: 'right',
		color: 'gray',
		fontWeight: 'bold',
		marginRight: 10,
	},
	tweet: {
		backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightblue",
    overflow: "hidden",
    margin: 5,
	},
	blockquote: {
		backgroundColor: 'lightgray',
		padding: 10,
    borderRadius: 20,
    overflow: "hidden",
    margin: 5,
  }
});