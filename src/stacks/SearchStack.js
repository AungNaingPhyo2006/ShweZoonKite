import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Timer from '../screens/entertainment/Timer';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerTest from '../screens/DrawerTest';
import SvgScreen from '../screens/testing/SvgScreen';

const Stack = createStackNavigator();
const SearchStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Timer"
        component={Timer}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="SvgScreen"
        component={SvgScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;

const styles = StyleSheet.create({});
