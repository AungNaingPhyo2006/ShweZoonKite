import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Player from '../screens/entertainment/Player';
const Stack = createStackNavigator();

const EntertainmentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Player"
        component={Player}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default EntertainmentStack;

const styles = StyleSheet.create({});
