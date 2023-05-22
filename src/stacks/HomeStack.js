import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import HomePage from '../screens/HomePage';
import CookPage from '../screens/home/CookPage';
import SnackPage from '../screens/home/SnackPage';
import HealthPage from '../screens/home/HealthPage';
import OtherDetails from '../screens/OtherDetails';
import NavHeader from '../utils/NavHeader';
import RecipeDetails from '../screens/RecipeDetails';
import SearchTest from '../utils/SearchTest';
import ShoePage from '../screens/home/ShoePage';
import ShowModal from '../utils/ShowModal';
import TestScreen from '../screens/TestScreen';
import SearchRecipes from '../utils/SearchRecipes';
import Map from '../screens/Map';
import Map1 from '../screens/Map1';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MapDrawer from '../screens/MapDrawer';
import MapBottomSheet from '../screens/shopping/MapBottomSheet';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen name="Map" component={Map} options={{headerShown: false}} />
      {/* <Stack.Screen
        name="Map1"
        component={Map1}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="MapBottomSheet"
        component={MapBottomSheet}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
