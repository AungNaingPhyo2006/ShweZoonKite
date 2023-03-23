import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import NavHeader from '../utils/NavHeader';

const RecipeDetails = ({navigation, route}) => {
  // console.log(route);
  const {item} = route.params;
  return (
    <View>
      <NavHeader navigation={navigation} title={'Recipes Details'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 20,
          marginHorizontal: 15,
          paddingVertical: 20,
          // marginBottom: 90,
        }}>
        <View style={{paddingVertical: 5}}>
          <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>
            {item.name}
          </Text>
        </View>
        <Text style={{textAlign: 'center', marginVertical: 5}}>
          {item.description}
        </Text>
        <View
          style={{
            borderTopColor: 'red',
            borderTopWidth: 3,
            marginVertical: 8,
          }}></View>
        <View style={{marginBottom: 9}}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>
            ပါ၀င်သောပစ္စည်းများ
          </Text>
        </View>
        <View>
          <Text>{item.ingredients}</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'red',
            borderBottomWidth: 3,
            marginVertical: 16,
          }}></View>
        <View style={{marginBottom: 9}}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>
            စီမံ ချက်ပြုတ်နည်း
          </Text>
        </View>
        <View>
          <Text>{item.method}</Text>
        </View>
        <View
          style={{
            borderTopColor: 'red',
            borderTopWidth: 3,
            marginVertical: 16,
          }}></View>
        <View style={{marginTop: 150}}></View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({});
