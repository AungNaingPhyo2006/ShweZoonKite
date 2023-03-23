import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import TextTickerScreen from '../example/TextTickerScreen';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <TextTickerScreen
          title={'🚂🚃🚃🚃🚃☕🌽🍹🍎🥗🍻🍜🍰🍚🍓🍔🚃🚃🚃🚃🚃🏁'}
        />
      </View>

      <TouchableOpacity
        style={styles.taskTitle}
        onPress={() => navigation.navigate('CookPage')}>
        <Text>Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskTitle}
        onPress={() => navigation.navigate('SnackPage')}>
        <Text>Snack</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskTitle}
        onPress={() => navigation.navigate('HealthPage')}>
        <Text>Health Knowledge</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskTitle}
        onPress={() => navigation.navigate('OtherDetails')}>
        <Text>Details Knowledge</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskTitle}
        onPress={() => navigation.navigate('ShoePage')}>
        <Text>Shoe Page</Text>
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
    justifyContent: 'center',
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
