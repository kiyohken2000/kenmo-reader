import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Home from 'scenes/home'
import Profile from 'scenes/profile'
import Details from 'scenes/details'

import NewsList from 'scenes/newslist'
import Article from 'scenes/article'
import Sites from 'scenes/sites'
import Request from 'scenes/request'
import All from 'scenes/all'
import Archive from 'scenes/archive'
import Topic from 'scenes/topic'

// import HeaderLeft from './HeaderLeft'
import HeaderTitle from './HeaderTitle'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

export const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: 'Home',
        // headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={({ navigation }) => ({
        title: 'Home',
        // headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
  </Stack.Navigator>
)

export const ProfileNavigator = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => ({
        title: 'Profile',
        // headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{
        title: 'Details',
      }}
    />
  </Stack.Navigator>
)

export const NewsListNavigator = () => (
  <Stack.Navigator
    initialRouteName="Sites"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Sites"
      component={Sites}
      options={({ navigation }) => ({
        title: 'Sites',
      })}
    />
    <Stack.Screen
      name="NewsList"
      component={NewsList}
      options={({ navigation }) => ({
        title: 'NewsList',
      })}
    />
    <Stack.Screen
      name="Article"
      component={Article}
      options={({ navigation }) => ({
        title: 'Article',
      })}
    />
    <Stack.Screen
      name="Request"
      component={Request}
      options={({ navigation }) => ({
        title: 'Request',
      })}
    />
  </Stack.Navigator>
)

export const AllNewsNavigator = () => (
  <Stack.Navigator
    initialRouteName="All"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="All"
      component={All}
      options={({ navigation }) => ({
        title: 'All Article',
      })}
    />
    <Stack.Screen
      name="Article"
      component={Article}
      options={({ navigation }) => ({
        title: 'Article',
      })}
    />
  </Stack.Navigator>
)

export const ArchiveNavigator = () => (
  <Stack.Navigator
    initialRouteName="Archive"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Archive"
      component={Archive}
      options={({ navigation }) => ({
        title: 'Archive',
      })}
    />
    <Stack.Screen
      name="Article"
      component={Article}
      options={({ navigation }) => ({
        title: 'Article',
      })}
    />
  </Stack.Navigator>
)

export const TopicNavigator = () => (
  <Stack.Navigator
    initialRouteName="Topic"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Topic"
      component={Topic}
      options={({ navigation }) => ({
        title: 'Topic',
      })}
    />
    <Stack.Screen
      name="Article"
      component={Article}
      options={({ navigation }) => ({
        title: 'Article',
      })}
    />
  </Stack.Navigator>
)