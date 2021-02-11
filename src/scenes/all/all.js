import React from 'react'
import { Text, View, StatusBar, StyleSheet, RefreshControl, ScrollView, TouchableOpacity } from 'react-native'
import Button from 'components/Button'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'
import { sites } from '../sites/list'
import { Card } from 'galio-framework'

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

siteName(url) {
	const domain = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
	const site = sites.find((v) => v.domain === domain);
	return site
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
					<ScrollView
						contentContainerStyle={styles.scrollContentContainer}
						refreshControl={
							<RefreshControl
								onRefresh={() => {this.getNews(), this.clearData()}}
							/>
						}
					>
						{
							items.map((item, i) => {
								return (
									<TouchableOpacity
										onPress={() => this.props.navigation.navigate('Article', { url: item.url, content:item.content, title:item.title, from: 'arrival', date:item.date })}
									>
										<Card
											key={i}
											flex
											style={styles.card}
											shadow
											avatar={this.siteName(item.url).avatar}
											// image={this.siteName(item.url).avatar}
											title={item.title}
										>
											<Text style={styles.site}>{this.siteName(item.url).name}</Text>
											<Text style={styles.date}>{item.date}</Text>
										</Card>
									</TouchableOpacity>
									);
							})
						}
					</ScrollView>
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
	},
	scrollContentContainer: {
    paddingBottom: 1,
  },
	card: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#fff',
    padding: 10,
		backgroundColor: 'white',
		margin: 10,
  },
	site: {
    fontSize: 15,
    textAlign: 'left',
		color: 'gray',
	},
});