import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Map1 = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(null);

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
            radius={300}
            strokeColor={'pink'}
            strokeWidth={2}
            fillColor={'rgba(0, 0, 255, 1)'}
          />
        </MapView>
      )}
      {!currentLocation && <Text>Loading...</Text>}
    </View>
  );
};

export default Map1;
