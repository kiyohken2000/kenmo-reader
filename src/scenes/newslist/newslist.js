import React from 'react'
import { Text, View, StatusBar, StyleSheet } from 'react-native'
import { List, ListItem, Thumbnail, Container, Content } from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'
import Button from 'components/Button'
import { colors } from 'theme'

class WPPost {
	constructor(post) {
		this.post = post;
		this.title = post.title.rendered;
		this.content = post.content.rendered;
		this.date = post.date;
		// this.thumbnail = this.getThumbnail();
		this.url = post.link;
	}


	getThumbnail() {
		var wpfm = this.post["_embedded"]["wp:featuredmedia"];
		if (wpfm != undefined) {
			return wpfm[0]["media_details"]["sizes"]["thumb150"]["source_url"];
		} else {
			return 'http://loumo.jp/wp/wp-content/themes/simplicity2/images/no-image.png';
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
						<List
							dataArray={items}
							renderRow={
								(item) =>
								<ListItem
									onPress={() => this.props.navigation.navigate('Article', { url: item.url, content:item.content, title:item.title })}
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
		marginBottom: 40,
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