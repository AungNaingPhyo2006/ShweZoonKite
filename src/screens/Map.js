import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import MapView, {
  DirectionsRenderer,
  Marker,
  Polyline,
  MapViewDirections,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import {Button, StyleSheet, Dimensions} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';

const Map = ({navigation}) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [coordinates] = useState([
    {
      latitude: 16.798307,
      longitude: 96.149612, //shwedagon
    },
    {
      latitude: 17.4772908935,
      longitude: 97.1011248233,
    },
  ]);
  // const [locationPermission, setLocationPermission] = useState(null);

  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         setLocationPermission(true);
  //       } else {
  //         setLocationPermission(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   requestLocationPermission();
  // }, []);

  //for current location
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      },
      error => {
        console.log(error);
        // Toast.show('Error getting location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const handleDirections = async () => {
    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyALnrZPpREU9l2AvVbS1GlYqaFVbB9t7Q8`,
      );
      const respJson = await resp.json();

      // if (!respJson.routes || respJson.routes.length === 0) {
      //   throw new Error(
      //     `No routes found. Response: ${JSON.stringify(respJson)}`,
      //   );
      // }

      const points = respJson.routes[0].overview_polyline.points;
      setDirections(points);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 100,
          // backgroundColor: 'pink',
          paddingVertical: 5,
          marginHorizontal: 12,
          marginVertical: 12,
        }}>
        <GooglePlacesAutocomplete
          styles={{
            textInput: {
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              fontSize: 16,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 20,
              marginRight: 20,
              height: 40,
            },
            listView: {
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              marginTop: 5,
              marginLeft: 20,
              marginRight: 20,
            },
            row: {
              padding: 10,
              height: 44,
            },
          }}
          placeholder="Search origin"
          onPress={(data, details = null) => {
            setOrigin(details.geometry.location); // Update the origin variable with the selected place's details
          }}
          query={{
            key: 'AIzaSyALnrZPpREU9l2AvVbS1GlYqaFVbB9t7Q8',
            language: 'en',
          }}
        />

        <GooglePlacesAutocomplete
          styles={{
            textInput: {
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              fontSize: 16,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 20,
              marginRight: 20,
              height: 40,
            },
            listView: {
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              marginTop: 5,
              marginLeft: 20,
              marginRight: 20,
            },
            row: {
              padding: 10,
              height: 44,
            },
          }}
          placeholder="Search destination"
          onPress={(data, details = null) => {
            setDestination(details.geometry.location); // Update the destination variable with the selected place's details
          }}
          query={{
            key: 'AIzaSyALnrZPpREU9l2AvVbS1GlYqaFVbB9t7Q8',
            language: 'en',
          }}
        />
      </View>
      <MapView
        // style={{flex: 1, marginTop: 5}}
        style={styles.maps}
        initialRegion={{
          // latitude: 16.7984,
          // longitude: 96.1493,
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={currentLocation} //current location
        mapType="standard">
        {/* {origin && (
          <MapView.Marker
            coordinate={{
              latitude: origin.lat,
              longitude: origin.lng,
            }}
            title="Origin"
          />
        )}
        {destination && (
          <MapView.Marker
            coordinate={{
              latitude: destination.lat,
              longitude: destination.lng,
            }}
            title="Destination"
          />
        )}
        {directions && (
          <DirectionsRenderer
            points={directions}
            strokeWidth={5}
            strokeColor="#669DF6"
          />
        )} */}
        {/* current location */}
        {/* locationPermission === true && */}
        {currentLocation && (
          <Marker coordinate={currentLocation} title="I am here" />
        )}

        {/* Added google map fns */}
        <Marker
          coordinate={coordinates[0]}
          title="ShweDaGon"
          description="pagoda"
          onPress={() => {
            Alert.alert('ShweDaGon', 'This is the famous pagoda for Myanmar.');
          }}
          // image={require('../assets/images/chef1024.png')}
          // style={{width: 10, height: 10}}
        />
        <Marker
          coordinate={coordinates[1]}
          title="Kyeik Htee Yoe"
          description="pagoda"
          onPress={() => {
            Alert.alert(
              'Kyeik Htee Yoe',
              'This is the famous pagoda for Mon State.',
            );
          }}
        />
        <Polyline
          coordinates={coordinates}
          // strokeColor="red"
          strokeColors={['#7F0000']}
          strokeWidth={4}
        />
        {/* <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey="AIzaSyALnrZPpREU9l2AvVbS1GlYqaFVbB9t7Q8" // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        /> */}
      </MapView>
      <Button title="Get directions" onPress={handleDirections} />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
