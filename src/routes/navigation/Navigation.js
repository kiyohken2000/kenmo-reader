import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import DrawerNavigator from './drawer'
import { HomeNavigator, ProfileNavigator, NewsListNavigator } from './stacks'


export default () => (
  <NavigationContainer>
    <NewsListNavigator />
  </NavigationContainer>
)
