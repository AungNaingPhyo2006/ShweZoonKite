import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Timertest from '../screens/shopping/Timertest';
import Quote from '../screens/shopping/Quote';
import BackTimer from '../screens/shopping/BackTimer';
import Contact from '../screens/shopping/Contact';
import DrawerFooter from '../screens/shopping/DrawerFooter';
import BottomDrawer from '../screens/shopping/BottomDrawer';
import BottomSheet from '../screens/shopping/BottomSheetPro';
import SvgScreen from '../screens/testing/SvgScreen';
const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Timertest"
        component={Timertest}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="Quote"
        component={Quote}
        options={{headerShown: false}}
      /> */}

      {/* <Stack.Screen
        name="BackTimer"
        component={BackTimer}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="DrawerFooter"
        component={DrawerFooter}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="BottomDrawer"
        component={BottomDrawer}
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

export default SettingStack;

const styles = StyleSheet.create({});
