import React from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActualDimensions from './ActualDimensions';

const RecipeModal = ({modalVisible, details, onClose}) => {
  console.log(details);
  return (
    <Modal visible={modalVisible}>
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            padding: 10,
            backgroundColor: 'lightblue',
          }}>
          <View></View>
          <View></View>
          <TouchableOpacity style={{}} onPress={onClose}>
            <Text>close</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: 'pink',
          }}>
          <View
            style={{
              width: '100%',
              height: ActualDimensions.height - ActualDimensions.width,
              backgroundColor: 'cyan',
              padding: 5,
            }}>
            <ImageBackground
              source={details?.photo}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain">
              <View style={{}}>
                <Text
                  style={{color: 'blue', alignSelf: 'center', fontSize: 24}}>
                  {details?.name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          {/* DETAILS */}
          <View>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 15,
                backgroundColor: 'red',
              }}>
              <Text style={{color: 'blue'}}>
                <Text style={{color: 'pink', fontSize: 18}}>ingredients: </Text>
                {details?.ingredients}
              </Text>
            </View>
            <View style={{alignItems: 'center', marginHorizontal: 15}}>
              <Text>{details?.method}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default RecipeModal;
