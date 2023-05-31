import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Drawer} from 'react-native-drawer-layout';
import DrawerButton from './DrawerButton';
// see SearchStack.js
function Feed() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Article Screen</Text>
    </View>
  );
}

//const Drawer = createDrawerNavigator();

const DrawerTest = ({open, setOpen}) => {
  // const [open, setOpen] = useState(false);
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      // onClose={() => setOpen(false)}
      // drawerPosition="right"
      renderDrawerContent={() => {
        //component you like
        return <Text>Drawer content</Text>;
      }}>
      {/* <TouchableOpacity
        onPress={() => setOpen(prevOpen => !prevOpen)}
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'blue',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Open</Text>
      </TouchableOpacity> */}
    </Drawer>

    // <--------For left side drawer end---------->
  );
};

export default DrawerTest;

const styles = StyleSheet.create({});
