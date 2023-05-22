import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  Text,
  PanResponder,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const MapSearchModal = ({isSearchModal, SearchModalOpen, setIsSearchModal}) => {
  const [marginTop, setMarginTop] = useState(690);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // Adjust the marginTop based on the vertical gesture distance
        const newMarginTop = gestureState.dy >= 0 ? 690 + gestureState.dy : 50;
        setMarginTop(newMarginTop);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy < 20) {
          // Close the modal when dragged down by a certain threshold (e.g., 50)
          setIsSearchModal(false);
        } else {
          // Reset the marginTop to 50 if the gesture is not sufficient to close the modal
          setMarginTop(50);
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Modal visible={isSearchModal} transparent animationType="slide">
        <View
          style={[styles.modalContainer, {marginTop}]}
          {...panResponder.panHandlers}>
          <View style={{marginVertical: 20}}>
            <TouchableOpacity
              // onPress={SearchModalOpen}
              style={styles.closeButton}></TouchableOpacity>
          </View>

          {/* <View style={styles.drawerContent}></View> */}

          <View style={{marginVertical: 5, alignItems: 'center'}}></View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    // marginTop: 690,
    backgroundColor: '#0D1724',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  drawerContent: {
    height: '80%',
    backgroundColor: '#000',
    padding: 9,
  },
  openButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 10,
  },
  closeButton: {
    alignSelf: 'center',
    width: 90,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  textContent: {
    flexDirection: 'row',
    paddingLeft: 35,
    paddingVertical: 15,
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#0D0D0D',
    alignSelf: 'center',
  },
  kw: {
    backgroundColor: '#514bc3',
    borderRadius: 9,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});

export default MapSearchModal;
