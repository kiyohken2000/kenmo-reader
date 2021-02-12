import React from 'react'
import { Text, View, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { List, ListItem, Thumbnail, Container, Content } from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'
import Button from 'components/Button'
import { colors } from 'theme'
import { sites } from '../sites/list'
import { Card } from 'galio-framework'

class WPPost {
	constructor(post) {
		this.post = post;
		this.title = post.title.rendered;
		this.content = post.content.rendered;
		this.date = post.date;
		this.thumbnail = this.getThumbnail();
		this.url = post.link;
	}

	getThumbnail() {
		const domain = this.post.link.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
		const site = sites.find((v) => v.domain === domain);
		try {
			var wpfm = this.post["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"]["medium"]["source_url"];
			return wpfm
		} catch(e) {
		try {
			var wpfm = this.post["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"]["thumb240"]["source_url"];
			return wpfm
		} catch(e) {
			return site.avatar
			}
		}
	}

}

export default class NewsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			items: [] ,
			spinner: true,
		};
	}

	componentDidMount() {
		fetch(this.props.route.params.url + '/wp-json/wp/v2/posts?_embed')
			.then((response) => response.json())
			.then((responseJson) => {
				for(var i in responseJson) {
					var p = new WPPost(responseJson[i]);
					this.setState({ items: this.state.items.concat([p]), spinner: false });
					// console.log(this.state.items)
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	siteName(url) {
		const domain = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
		const site = sites.find((v) => v.domain === domain);
		return site
	}

	render() {
		var items = this.state.items;
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
					<Spinner
          	visible={this.state.spinner}
          	textContent="読込中..."
            textStyle={{ color: "#fff" }}
            overlayColor="rgba(0,0,0,0.5)"
        	/>
					<View style={styles.content}>
						<ScrollView contentContainerStyle={styles.scrollContentContainer}>
							{
								items.map((item, i) => {
									return (
										<TouchableOpacity
											onPress={() => this.props.navigation.navigate('Article', { url: item.url, content:item.content, title:item.title, from: 'arrival', date:item.date, thumbnail:item.thumbnail })}
										>
											<Card
												key={i}
												flex
												style={styles.card}
												shadow
												avatar={this.siteName(item.url).avatar}
												image={item.thumbnail}
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