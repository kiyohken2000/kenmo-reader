import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Feather';

export default class Article extends React.Component {

	render() {
		const content = this.props.route.params.content
		const url = this.props.route.params.url
		const title = this.props.route.params.title
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<ScrollView contentContainerStyle={styles.scrollContentContainer}>
						<Text style={styles.paragraph}>
							{title}
						</Text>
						<HTML source={{ html:content }} />
					</ScrollView>
				</View>
				<View style={styles.Overlay}>
					<TouchableOpacity 
						onPress={ ()=>{ Linking.openURL(url)}}
					>
            <Icon name="external-link" size={30} color="black"/>
          </TouchableOpacity>
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
    paddingBottom: 40,
	},
	Overlay: {
    flex: 1,
    position: "absolute",
    opacity: 1.0,
    bottom: 30,
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