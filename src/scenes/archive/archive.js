import React from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { List, ListItem } from 'native-base'
import Icon from 'react-native-vector-icons/Feather'
import * as Haptics from 'expo-haptics'
import { sites } from '../sites/list'

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
		return site.name
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
						dataArray={items}
						renderRow={
							(item) =>
							<ListItem
								onPress={() => this.props.navigation.navigate('Article', { url: item.url, content:item.content, title:item.title })}
							>
								<View style={{ flexDirection: 'row'}}>
									<TouchableOpacity
										onPress={() => {
											global.storage.remove({
												key: 'archive',
												id: item.title,
											});
											Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) 
											this.clearData()
											this.loadStorage()
										}}
									> 
										<Icon name="check" size={30} color="black"/>
									</TouchableOpacity>
									<View style={styles.list}>
										<Text style={styles.title}>{item.title}</Text>
										<Text style={styles.site}>{this.siteName(item.url)}</Text>
										<Text style={styles.date}>{item.date}</Text>
									</View>
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
	},
	site: {
    fontSize: 15,
    textAlign: 'right',
		color: 'gray',
	},
});