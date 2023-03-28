import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({navigation, onPress}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: 'pink',
          marginHorizontal: 10,
          padding: 11,
          borderRadius: 5,
        }}>
        <Text style={{color: 'blue'}}>Search</Text>
        <Icon
          name="search"
          size={20}
          color="#900"
          style={{marginHorizontal: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
