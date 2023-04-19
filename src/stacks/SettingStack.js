import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Timertest from '../screens/shopping/Timertest';
const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Timertest"
        component={Timertest}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;

const styles = StyleSheet.create({});
