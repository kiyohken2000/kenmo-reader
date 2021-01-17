import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, StatusBar } from 'react-native';
import HTML, {domNodeToHTMLString} from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';
import { largeClassesStyles, middleClassesStyles, middleTagsStyles, largeTagsStyles } from './style';
import {iframe, table} from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import { IGNORED_TAGS } from 'react-native-render-html'

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
		const renderers = {
			table
		};
		const htmlConfig = {
			renderers: {
				iframe,
			},
			renderersProps: {
				iframe: {
					scalesPageToFit: true
				}
			},
			WebView
		};
		const defaultStyle = this.state.largeFont
		const defaultClass = this.state.largeFont
		const content = this.props.route.params.content
		const url = this.props.route.params.url
		const title = this.props.route.params.title
		
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
							key={ `youtube-${content}` }
							ignoredTags={[ ...IGNORED_TAGS, 'head']}
							{...htmlConfig}
						/>
					</ScrollView>
				</View>
				<View style={styles.Overlay}>
					<View style={{ flexDirection: 'row'}}>
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
    bottom: 80,
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