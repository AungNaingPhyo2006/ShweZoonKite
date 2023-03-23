import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const MyHeader = ({navigation}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 15,
          backgroundColor: '#000',
        }}>
        <TouchableOpacity onPress={navigation.goback()}>
          <Text style={{color: 'pink'}}>Back</Text>
        </TouchableOpacity>
        <View style={{}}>
          <Text style={{color: 'pink'}}>Shwe Zoon Kite</Text>
        </View>
        <TouchableOpacity>
          <Text style={{color: 'pink'}}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyHeader;

const styles = StyleSheet.create({});
