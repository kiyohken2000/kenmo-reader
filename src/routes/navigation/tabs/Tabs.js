import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'

// stack navigators
import { HomeNavigator, ProfileNavigator, NewsListNavigator, AllNewsNavigator, ArchiveNavigator, TopicNavigator } from '../stacks'

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        switch (route.name) {
          case 'Sites':
            return (
              <FontIcon
                name="book-reader"
                color={focused ? colors.lightPurple : colors.gray}
                size={20}
                solid
              />
            )
          case 'All':
            return (
              <FontIcon
                name="list"
                color={focused ? colors.lightPurple : colors.gray}
                size={20}
                solid
              />
            )
          case 'Archive':
            return (
              <FontIcon
                name="inbox"
                color={focused ? colors.lightPurple : colors.gray}
                size={20}
                solid
              />
            )
          case 'Topic':
            return (
              <FontIcon
                name="fire-alt"
                color={focused ? colors.lightPurple : colors.gray}
                size={20}
                solid
              />
            )
          default:
            return <View />
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.lightPurple,
      inactiveTintColor: colors.gray,
      style: {
        // backgroundColor: 'white',
        // borderTopColor: 'gray',
        // borderTopWidth: 1,
        // paddingBottom: 5,
        // paddingTop: 5,
      },
    }}
    initialRouteName="Sites"
    swipeEnabled={false}
  >
    <Tab.Screen name="Sites" component={NewsListNavigator} />
    <Tab.Screen name="All" component={AllNewsNavigator} />
    <Tab.Screen name="Archive" component={ArchiveNavigator} />
    <Tab.Screen name="Topic" component={TopicNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
