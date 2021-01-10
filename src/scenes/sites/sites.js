import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

import sites from './list'

const storage = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: false,
});
global.storage = storage;

export default class Sites extends React.Component {

  constructor() {
    super();
    this.state = {
      isVisible: false,
      sites: [],
      data: [],
    }
  }

  componentDidMount() {
    this.loadStrage();
  }

  loadStrage() {
    global.storage.getAllDataForKey('site')
      .then(res => {
        this.setState({data: res})
      });
    }

  _sites = () => {
  };

  showModal() {
    this.setState({isVisible: true});
  }
 
  closeModal() {
    this.setState({isVisible: false});
  }

	render() {
    var viewSites = this.state.data
		return (
      <View style={styles.container}>
        <View style={styles.content}>
			    <ScrollView>
            {
              viewSites.map((u, i) => {
                return (
                  <Card key={i}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('NewsList', { url: u.url })}
                    >
                      <View style={{ flexDirection: 'row'}}>
                        <View>
                          <Text>{u.siteid}</Text>
                          <Text>{u.name}</Text>
                          <Text>{u.url}</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 0 }}>
                          <TouchableOpacity
                            onPress={() => {
                              global.storage.remove({
                                key: 'site',
                                id: u.siteid,
                              });
                              this.loadStrage()
                            }}
                          >
                            <Icon name="x" size={20} color="green"/>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Card>
                );
              })
            }
          </ScrollView>
        </View>
        <View style={styles.Overlay}>
          <TouchableOpacity onPress={() => this.showModal()}>
            <Icon name="plus-circle" size={65} color="orange"/>
          </TouchableOpacity>
        </View>

        <Modal
          visible={this.state.isVisible}
          transparent={false}
          animationType={"slide" || "fade"}
          presentationStyle={"fullScreen" || "pageSheet" || "formSheet" || "overFullScreen"}
        >
          <View style={styles.container}>
            <Card>
              <Text>利用可能なサイトの一覧です</Text>
            </Card>
            <ScrollView>
              {
                sites.map((u, i) => {
                 return (
                  <Card key={i}>
                    <View style={{ flexDirection: 'row'}}>
                      <View>
                        <Text>{u.ID}</Text>
                        <Text>{u.name}</Text>
                        <Text>{u.url}</Text>
                      </View>
                      <View style={{ position: 'absolute', right: 0 }}>
                        <TouchableOpacity
                          onPress={() => {
                            var siteData = {
                              siteid: u.ID,
                              name: u.name,
                              url: u.url,
                            }
                            global.storage.save({
                              key: 'site',
                              id: u.ID,
                              data: siteData,
                            });
                            this.loadStrage()
                          }}
                        >
                          <Icon name="plus-circle" size={40} color="orange"/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                  );
                })
              }
            </ScrollView>
          </View>
          <View style={styles.Overlay}>
            <TouchableOpacity onPress={() => this.closeModal()}> 
              <Icon name="x-circle" size={65} color="blue"/>
            </TouchableOpacity>
          </View>
        </Modal>

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
  Overlay: {
    flex: 1,
    position: "absolute",
    opacity: 1.0,
    bottom: 25,
    right: 30,
    justifyContent: "center",
  },
});