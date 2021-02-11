import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { List, ListItem } from 'native-base'
import Icon from 'react-native-vector-icons/Feather'
import * as Haptics from 'expo-haptics'
import { sites } from '../sites/list'
import { Card, Button } from 'galio-framework'

class WPPost {
	constructor(post) {
		this.post = post;
		this.title = post.title;
		this.content = post.content;
		this.date = post.date;
		this.url = post.url;
	}
}

export default class Archive extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			items: [] ,
		};
	}
	
	componentDidMount() {
		const { navigation } = this.props;
		this._unsubscribe = navigation.addListener('focus', () => {
			this.clearData()
			this.loadStorage()
		});
	}

	componentWillUnmount() {
    this._unsubscribe();
  }

	loadStorage() {
		global.storage.getAllDataForKey('archive')
		.then((responseJson) => {
			for(var i in responseJson) {
				var p = new WPPost(responseJson[i]);
				this.setState({ items: this.state.items.concat([p]) });
			}
		})
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
					<ScrollView contentContainerStyle={styles.scrollContentContainer}>
						{
							items.map((item, i) => {
								return (
									<View style={{flex: 1, flexDirection: 'row'}}>
										<View style={{flex: 1, justifyContent: 'center'}}>
											<Button
												onlyIcon
												icon="x"
												iconFamily="Feather"
												iconSize={30}
												color="#c0c0c0"
												iconColor="black"
												style={{ width: 45, height: 45 }}
												onPress={() => {
													global.storage.remove({
														key: 'archive',
														id: item.title,
													});
													Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) 
													this.clearData()
													this.loadStorage()
												}}
											/>
										</View>
										<View style={{flex: 6}}>
											<TouchableOpacity
												onPress={() => this.props.navigation.navigate('Article', { url: item.url, content:item.content, title:item.title })}
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
										</View>
									</View>
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