import React from 'react'
import { Text, View, ScrollView, StatusBar, StyleSheet, RefreshControl } from 'react-native'
import { Card, List, ListItem, Thumbnail, Container, Content } from 'native-base'
import Button from 'components/Button'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

const storage = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: false,
});
global.storage = storage;

class WPPost {
	constructor(post) {
		this.post = post;
		this.title = post.title.rendered;
		this.content = post.content.rendered;
		this.date = post.date;
		this.url = post.link;
	}
}

export default class All extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			items: [] ,
			data: [],
		};
	}
	
componentDidMount() {
	this.getNews();
}

getNews() {
	global.storage.getAllDataForKey('site')
		.then(res => {
			const urls = res.map(site => site.url);
			for (const url of urls) {
				fetch(url + '/wp-json/wp/v2/posts?_embed')
					.then((response) => response.json())
					.then((responseJson) => {
						for(var i in responseJson) {
							var p = new WPPost(responseJson[i]);
							this.setState({ items: this.state.items.concat([p]) });
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		});
}

clearData() {
	this.setState({items: []})
}

render() {
	var items = this.state.items;
	items.sort(function(a, b) {
		if (a.date > b.date) {
				return -1;
		} else {
				return 1;
		}
 });
	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
				<View style={styles.content}>
					<List
						refreshControl={
							<RefreshControl
								onRefresh={() => {this.getNews(), this.clearData()}}
							/>
						}
						dataArray={items}
						renderRow={
							(item) =>
							<ListItem
								onPress={() => this.props.navigation.navigate('Article', { url: item.url, content:item.content, title:item.title, from: 'arrival', date: item.date })}
							>
								{/*<Thumbnail square size={80} source={{ uri: item.thumbnail }} />*/}
								<View style={styles.list}>
									<Text style={styles.title}>{item.title}</Text>
									<Text style={styles.date}>{item.date}</Text>
								</View>
							</ListItem>} >
					</List>
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
		marginBottom: 1,
	},
	title: {
    fontSize: 14,
	},
	list: {
		flex: 1
	},	
	date: {
    fontSize: 11,
    textAlign: 'right',
	}
});