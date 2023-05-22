// import React, {useEffect, useRef} from 'react';
// import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
// import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

// const backdropCom = () => {
//   <View style={[styles.backdrop, {marginTop: 120}]}></View>;
// };
// const MapBottomSheet = () => {
//   const bottomSheetModalRef = useRef(null);

//   // const openBottomSheet = () => {
//   //   bottomSheetModalRef.current.present();
//   // };

//   // const closeBottomSheet = () => {
//   //   bottomSheetModalRef.current.dismiss();
//   // };
//   bottomSheetModalRef.current?.present();

//   return (
//     <View style={styles.container}>
//       <BottomSheetModalProvider>
//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           snapPoints={['20%', '50%', '80%']}
//           initialSnapIndex={0}
//           overlay={false}
//           dismissOnPanDown={false} // Disable dismissing on pan down
//           dismissOnTapOutside={false} // Disable dismissing on tap outside
//           backdropComponent={backdropCom}>
//           <View style={styles.contentContainer}>
//             <Text style={styles.text}>Bottom Sheet Content</Text>
//             <IconFontAwesome name="filter" size={22} color={'blue'} />
//           </View>
//         </BottomSheetModal>
//       </BottomSheetModalProvider>
//     </View>
//   );
// };

// export default MapBottomSheet;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   contentContainer: {
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   text: {
//     fontSize: 16,
//   },
// });

// <----------------test---------->

import React, {useMemo, useState, useRef, useCallback, useEffect} from 'react';
import {
  Button,
  Text,
  View,
  PermissionsAndroid,
  StyleSheet,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import MapView, {Marker, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Feather';
import MapInfoModal from '../MapInfoModal';
import BottomSheet, {
  BottomSheetTextInput,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {Search, Filter, ChevronLeft} from 'lucide-react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {Drawer} from 'react-native-drawer-layout';
import IconIo from 'react-native-vector-icons/Ionicons';
import MapDrawerDetails from './MapDrawerDetails';
function MapBottomSheet() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInfoModal, setIsInfoModal] = useState(false);

  const InfoModalOpen = () => {
    setIsInfoModal(!isInfoModal);
  };
  const [open, setOpen] = useState(false);

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
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['10%', '70%'], []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {/* <----Drawer-------> */}
        <Drawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          // drawerPosition="right"
          renderDrawerContent={() => {
            //component you like
            return <MapDrawerDetails onClose={() => setOpen(false)} />;
          }}>
          {/* <----MapView-----> */}
          {currentLocation && (
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Circle
                center={currentLocation}
                radius={150}
                strokeColor={'pink'}
                strokeWidth={2}
                fillColor={'rgba(0, 0, 255, 1)'}
              />
            </MapView>
          )}

          {/* <---- modal button----> */}
          <View
            style={{
              color: '#000',
              position: 'absolute',
              top: 10,
              left: 10,
            }}>
            <TouchableOpacity
              onPress={() => setOpen(prevOpen => !prevOpen)}
              style={styles.icon1}>
              <Icon name="align-center" size={24} color={'white'} />
            </TouchableOpacity>
          </View>
          {/* <-------Vertical button----------> */}
          <View style={styles.buttonVertical}>
            <TouchableOpacity
              onPress={InfoModalOpen}
              style={{marginVertical: 8}}>
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
          </View>
        </Drawer>

        {/* <-----ButtonSheet----> */}
        {open ? (
          <></>
        ) : (
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
            handleIndicatorStyle={{backgroundColor: '#fff', width: 70}}
            keyboardBlurBehavior="restore">
            <View
              style={{
                flex: 1,
                padding: 10,
                flexDirection: 'row',
                paddingTop: 1,
              }}>
              {/* input container */}
              <View style={{flex: 1, flexDirection: 'row'}}>
                <BottomSheetTextInput
                  style={{
                    flex: 1,
                    backgroundColor: 'gray',
                    height: 40,
                    borderRadius: 15,
                    paddingLeft: 40,
                  }}
                  placeholder="Search"
                />
                <View style={{position: 'absolute', left: 10, top: 10}}>
                  <IconFontAwesome name="search" size={24} color={'white'} />
                </View>
              </View>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  backgroundColor: 'white',
                  marginLeft: 10,
                  height: 35,
                  width: 35,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}>
                <IconFontAwesome name="filter" color="#99d6ff" size={24} />
              </TouchableOpacity>
              {/* input container */}
            </View>
          </BottomSheet>
        )}

        {/* <---InfoModal----> */}
        {isInfoModal && (
          <MapInfoModal
            InfoModalOpen={InfoModalOpen}
            isInfoModal={isInfoModal}
            setIsInfoModal={setIsInfoModal}
          />
        )}

        {/* modal for filter */}
        {/* <Modal
          isVisible={isModalVisible}
          coverScreen={true}
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          animationInTiming={600}
          animationOutTiming={600}
          style={{margin: 0}}>
          <View style={{flex: 1, backgroundColor: '#001a33'}}>
            <FilterView toggle={toggleModal}/>
          </View>
        </Modal> */}

        {/* modal for filter */}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
  modalFooter: {
    width: 400,
    height: 90,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: 'pink',
    borderRadius: 20,
    width: '80%',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
  },
  icon: {
    marginLeft: 10,
  },
});

export default MapBottomSheet;
