import React from 'react'
import { Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class Sites extends React.Component {

	render() {
    const sites = [
      {
        name: '菊の門ニュース',
        url: 'https://kikunomon.news'
      },
      {
        name: '保守速報',
        url: 'https://hosyusokuhou.jp'
      },
      {
        name: 'VIDEOCARDZ',
        url: 'https://videocardz.com'
      },
      {
        name: 'kitguru',
        url: 'https://www.kitguru.net'
      },
      {
        name: 'wccftech',
        url: 'https://wccftech.com'
      },
    ]


		return (
			<ScrollView>
				<StatusBar barStyle="light-content" />
          {
            sites.map((u, i) => {
              return (
                  <Card key={i}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('NewsList', { url: u.url })}
                    >
                      <Text>{u.name}</Text>
                      <Text>{u.url}</Text>
                    </TouchableOpacity>
                  </Card>
              );
            })
          }
			</ScrollView>
		);
	}
}