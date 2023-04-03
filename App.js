import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './TabNavigator/BottomTabNavigator';
import SplashScreen from 'react-native-splash-screen';
import SplashScreen1 from './src/screens/SplashScreen';
import {View} from 'react-native';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // simulate a delay to show the splash screen for 2 seconds
    setTimeout(() => {
      setIsLoaded(true);
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1}}>
      {!isLoaded ? (
        <SplashScreen1 />
      ) : (
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      )}
    </View>
  );
};

export default App;
