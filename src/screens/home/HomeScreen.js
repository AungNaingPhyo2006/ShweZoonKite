import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          // backgroundColor: 'pink',
          padding: 9,
          justifyContent: 'space-between',
        }}>
        <View style={{height: 50, justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Home</Text>
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            justifyContent: 'center',
          }}>
          <Icon name="gear" size={20} color="#900" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.taskTitle}
        onPress={() => navigation.navigate('CookPage')}>
        <Text>Favourite Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.taskTitle}
        onPress={() => navigation.navigate('Map')}>
        <Text>Google Map</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.taskTitle}
        onPress={() => navigation.navigate('Map1')}>
        <Text>Google Map One</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 9,
    // justifyContent: 'center',
  },
  taskTitle: {
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
});
