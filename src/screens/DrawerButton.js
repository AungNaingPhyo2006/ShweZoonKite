import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DrawerButton = ({navigation, isDrawerOpen}) => {
  const toggleDrawer = () => {
    if (isDrawerOpen) {
      navigation.closeDrawer();
    } else {
      navigation.openDrawer();
    }
  };

  return (
    <Button
      title={isDrawerOpen ? 'Close Drawer' : 'Open Drawer'}
      onPress={toggleDrawer}
    />
  );
};

export default DrawerButton;

const styles = StyleSheet.create({});
