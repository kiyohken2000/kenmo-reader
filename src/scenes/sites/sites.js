import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Modal, StatusBar, Linking } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'
import { sites, lastUpdate} from './list'
import * as Haptics from 'expo-haptics';

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
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>
			    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
            {
              viewSites.map((u, i) => {
                return (
                  <Card key={i}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('NewsList', { url: u.url })}
                    >
                      <View style={{ flexDirection: 'row'}}>
                        <View>
                          <Text style={styles.name}>{u.name}</Text>
                          <Text style={styles.caption}>{u.caption}</Text>
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
        <View style={styles.Overlay2}>
          <View style={{ flexDirection: 'row'}}>
            <View style={{ position: 'absolute', right: 80, alignSelf:'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Request', { from: 'home' })}>
                <Icon name="message-square" size={65} color="orange"/>
              </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', right: 0, alignSelf:'center' }}>
              <TouchableOpacity onPress={() => this.showModal()}>
                <Icon name="plus-circle" size={65} color="orange"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          visible={this.state.isVisible}
          transparent={false}
          animationType={"slide" || "fade"}
          presentationStyle={"fullScreen" || "pageSheet" || "formSheet" || "overFullScreen"}
        >
          <View style={styles.container}>
            <View style={styles.modaltitle}>
            <Card>
              <View style={{ flexDirection: 'row'}}>
                <View>
                  <Text>利用可能なサイトの一覧です</Text>
                </View>
                <View style={{ position: 'absolute', right: 0 }}>
                  <Text>{lastUpdate}</Text>
                </View>
              </View>
            </Card>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
              {
                sites.map((u, i) => {
                 return (
                  <Card key={i}>
                    <View style={{ flexDirection: 'row'}}>
                      <View>
                        <Text style={styles.name}>{u.name}</Text>
                        <Text style={styles.caption}>{u.caption}</Text>
                      </View>
                          <View style={{ position: 'absolute', right: 60, alignSelf:'center' }}>
                            <TouchableOpacity
                              onPress={ ()=>{ Linking.openURL(u.url)}}
                            >
                              <Icon name="external-link" size={40} color="black"/>
                            </TouchableOpacity>
                          </View>
                          <View style={{ position: 'absolute', right: 0, alignSelf:'center' }}>
                            <TouchableOpacity
                              onPress={() => {
                                var siteData = {
                                  siteid: u.ID,
                                  name: u.name,
                                  url: u.url,
                                  caption: u.caption,
                                }
                                global.storage.save({
                                  key: 'site',
                                  id: u.ID,
                                  data: siteData,
                                });
                                this.loadStrage()
                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
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
  Overlay2: {
    flex: 1,
    position: "absolute",
    opacity: 1.0,
    bottom: 60,
    right: 30,
    justifyContent: "center",
  },
  scrollContentContainer: {
    paddingBottom: 85,
  },
  modaltitle: {
    paddingTop: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
  },
});