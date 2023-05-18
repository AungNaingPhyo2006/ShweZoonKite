import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapDrawer from './MapDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import MapInfoModal from './MapInfoModal';
import MapSearchModal from './MapSearchModal';

const Drawer = createDrawerNavigator();
const Map1 = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [toggleDrawer, setToggleDrawer] = useState(false);

  // const toggleDrawerMenu = () => {
  //   setToggleDrawer(!toggleDrawer);
  // };
  const drawerAnimation = new Animated.Value(0);
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission Required',
            message: 'This app needs to access your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setCurrentLocation({latitude, longitude});
            },
            error => {
              console.log('Error getting location: ', error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          console.log('Location permission denied');
          // Handle the case where the user denies location permissions
          setCurrentLocation({latitude: 16.798307, longitude: 96.149612}); // Set a default location
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // const openDrawer = () => {
  //   navigation.openDrawer();
  // };

  // const closeDrawer = () => {
  //   navigation.closeDrawer();
  // };

  const [isInfoModal, setIsInfoModal] = useState(false);

  const InfoModalOpen = () => {
    setIsInfoModal(!isInfoModal);
  };
  const [isSearchModal, setIsSearchModal] = useState(false);
  const SearchModalOpen = () => {
    setIsSearchModal(!isSearchModal);
  };
  return (
    <View style={{flex: 1}}>
      {currentLocation && (
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {/* <Marker
            coordinate={currentLocation}
            title="My Location"
            pinColor="blue"
          /> */}
          <Circle
            center={currentLocation}
            radius={150}
            strokeColor={'pink'}
            strokeWidth={2}
            fillColor={'rgba(0, 0, 255, 1)'}
          />
        </MapView>
      )}

      {/* <Drawer.Navigator>
        <Drawer.Screen
          name="MapDrawer"
          component={MapDrawer}
          options={{
            drawerProps: {
              // Pass your props here
              closeDrawer: closeDrawer,
              isDrawerOpen: isDrawerOpen,
              navigation: navigation,
              toggleDrawerMenu: toggleDrawerMenu,
            },
          }}
        />
      </Drawer.Navigator> */}

      {isDrawerOpen && (
        <MapDrawer
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
          navigation={navigation}
        />
      )}
      {isInfoModal && (
        <MapInfoModal
          InfoModalOpen={InfoModalOpen}
          isInfoModal={isInfoModal}
          setIsInfoModal={setIsInfoModal}
        />
      )}
      <TouchableOpacity onPress={toggleDrawer} style={styles.button}>
        <View style={styles.icon1}>
          <Icon name="align-center" size={24} color={'white'} />
        </View>
      </TouchableOpacity>

      <View style={styles.buttonVertical}>
        <TouchableOpacity onPress={InfoModalOpen} style={{marginVertical: 8}}>
          <View style={styles.icon1}>
            <Icon name="info" size={24} color={'white'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('', 'History');
          }}
          style={{marginVertical: 8}}>
          <View style={styles.icon1}>
            <IconFontAwesome name="history" size={24} color={'white'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('', 'crosshairs');
          }}
          style={{marginVertical: 8}}>
          <View style={styles.icon1}>
            <IconFontAwesome name="crosshairs" size={24} color={'white'} />
          </View>
        </TouchableOpacity>
        <MapSearchModal
          isSearchModal={isSearchModal}
          SearchModalOpen={SearchModalOpen}
          setIsSearchModal={setIsSearchModal}
        />
      </View>
      {!currentLocation && <Text>Loading...</Text>}
    </View>
  );
};

export default Map1;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#000',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    zIndex: 999,
  },
  button: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 9999,
  },
  buttonVertical: {
    position: 'absolute',
    bottom: 90,
    right: 10,
    zIndex: 9999,
  },
  icon1: {
    width: 40,
    height: 40,
    backgroundColor: '#514BC3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
