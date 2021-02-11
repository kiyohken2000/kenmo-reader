import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import { List, ListItem } from 'native-base'
import Icon from 'react-native-vector-icons/Feather'
import * as Haptics from 'expo-haptics'
import { sites } from '../sites/list'
import dbh from '../../../firebase'
import { Card } from 'galio-framework'

class WPPost {
	constructor(post) {
		this.post = post;
		this.title = post.title;
		this.content = post.content;
		this.date = post.date;
		this.url = post.url;
	}
}

export default class Topic extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			items: [] ,
		};
	}

componentDidMount() {
	this.getTopic();
}

getTopic() {
	const arrays = [];
	dbh.collection("article").orderBy("date1", "desc").limit(20).get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			arrays.push(doc.data());
		});
		for(var i in arrays) {
			var p = new WPPost(arrays[i]);
			this.setState({ items: this.state.items.concat([p]) });
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
			if (a.date1 > b.date1) {
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
								onRefresh={() => {this.getTopic(), this.clearData()}}
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