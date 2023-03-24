import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SearchTest from '../utils/SearchTest';
import recipeData from '../data/recipeData';

const TestScreen = ({navigation, route}) => {
  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center'}}>TestScreen</Text>
      <SearchTest navigation={navigation} setData={recipeData} />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
