import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CookPage from './CookPage';
import OtherDetails from './OtherDetails';
import NavHeader from '../utils/NavHeader';
import HomeScreen from './HomeScreen';
import RecipeDetails from './RecipeDetails';
import SplashScreen from './SplashScreen';
import SnackPage from './SnackPage';
import HealthPage from './HealthPage';
import ShoePage from './ShoePage';
import ShowModal from '../utils/ShowModal';

const Stack = createStackNavigator();

const HomePage = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{}}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CookPage"
          component={CookPage}
          options={{headerShown: false}}
          // options={{header: NavHeader}}
        />
        <Stack.Screen
          name="SnackPage"
          component={SnackPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HealthPage"
          component={HealthPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtherDetails"
          component={OtherDetails}
          options={{headerShown: false}}
          // options={{header: NavHeader}}
        />
        <Stack.Screen
          name="NavHeader"
          component={NavHeader}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Text"
          component={Text}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShoePage"
          component={ShoePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowModal"
          component={ShowModal}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
