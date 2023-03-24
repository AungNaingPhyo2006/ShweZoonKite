import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import TextTickerScreen from '../example/TextTickerScreen';

const SlideInUp = ({children, style}) => {
  // const slideAnim = useRef(new Animated.Value(-100)).current; // slideinDown
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View
      style={[
        {
          transform: [
            {
              translateY: slideAnim,
            },
          ],
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <TextTickerScreen
          title={'🚂🚃🚃🚃🚃☕🌽🍹🍎🥗🍻🍜🍰🍚🍓🍔🚃🚃🚃🚃🚃🏁'}
        />
      </View>

      <SlideInUp style={styles.container}>
        <TouchableOpacity
          style={styles.taskTitle}
          onPress={() => navigation.navigate('CookPage')}>
          <Text>Favourite Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.taskTitle}
          onPress={() => navigation.navigate('SnackPage')}>
          <Text>Delicious Snacks </Text>
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

        {/* <TouchableOpacity
          style={styles.taskTitle}
          onPress={() => navigation.navigate('SearchTest')}>
          <Text>Search Test</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.taskTitle}
          onPress={() => navigation.navigate('TestScreen')}>
          <Text>Test</Text>
        </TouchableOpacity>
      </SlideInUp>
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
