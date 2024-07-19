/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTab from './Src/Navigation/BottomTab';

const App = () => {
  return (
    <SafeAreaProvider style={{flex: 1, backgroundColor: '#fff'}}>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
