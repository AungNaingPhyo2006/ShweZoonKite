import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MyHeader from '../components/MyHeader';

const NavHeader = ({navigation, title}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 15,
          backgroundColor: 'pink',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{color: 'darkblue'}}>Back</Text>
        </TouchableOpacity>
        <View style={{}}>
          <Text style={{color: 'darkblue', fontWeight: 'bold'}}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('I am test');
          }}>
          <Text style={{color: 'darkblue'}}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavHeader;

const styles = StyleSheet.create({});
