import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CookPage from './home/CookPage';
import OtherDetails from './OtherDetails';
import NavHeader from '../utils/NavHeader';
import HomeScreen1 from './HomeScreen1';
import RecipeDetails from './RecipeDetails';
import SplashScreen from './SplashScreen';
import SnackPage from './home/SnackPage';
import HealthPage from './home/HealthPage';
import ShoePage from './home/ShoePage';
import ShowModal from '../utils/ShowModal';
import SearchTest from '../utils/SearchTest';
import TestScreen from './TestScreen';
import SearchRecipes from '../utils/SearchRecipes';

const Stack = createStackNavigator();

const HomePage = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{}}>
        {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Home1"
          component={HomeScreen1}
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
          name="SearchTest"
          component={SearchTest}
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
        <Stack.Screen
          name="TestScreen"
          component={TestScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchRecipes"
          component={SearchRecipes}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
