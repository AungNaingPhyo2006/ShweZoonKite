import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  Text,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const MapInfoModal = ({isInfoModal, InfoModalOpen, setIsInfoModal}) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 20) {
          // Close the modal when dragged down by a certain threshold (e.g., 50)
          setIsInfoModal(false);
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Modal visible={isInfoModal} transparent animationType="slide">
        <View style={styles.modalContainer} {...panResponder.panHandlers}>
          <View style={{marginVertical: 20}}>
            <TouchableOpacity
              onPress={InfoModalOpen}
              style={styles.closeButton}></TouchableOpacity>
          </View>

          {/* <View style={styles.drawerContent}></View> */}

          <View style={{marginVertical: 5, alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              မြေပုံအညွှန်း
            </Text>
            <View style={{marginTop: 25}}>
              <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                အညွှန်းသင်္ကေတများ
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#36373b',
                width: '96%',
                marginHorizontal: 5,
                borderRadius: 10,
                marginVertical: 5,
              }}>
              <View style={styles.textContent}>
                <Icon name="battery-charging" size={22} color={'#32c760'} />
                <View style={{paddingHorizontal: 9}}></View>
                <Text style={{color: '#fff'}}>အားသွင်းနိုင်သည်</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.textContent}>
                <Icon name="zap-off" size={22} color={'#D50505'} />
                <View style={{paddingHorizontal: 9}}></View>
                <Text style={{color: '#fff'}}>ပလပ်ပေါက်မအားသေးပါ</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.textContent}>
                <Icon name="lock" size={22} color={'#A9A8AE'} />
                <View style={{paddingHorizontal: 9}}></View>
                <Text style={{color: '#fff'}}>ပိတ်ထားသည်</Text>
              </View>
            </View>

            {/* <------------> */}
            <View style={{marginTop: 25}}>
              <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                ပါ၀ါရွေးချယ်မှု
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#36373b',
                width: '96%',
                marginHorizontal: 5,
                borderRadius: 10,
                marginVertical: 5,
              }}>
              <View style={styles.textContent}>
                <View style={styles.kw}>
                  <Text style={{fontSize: 9, color: 'white'}}>50 KW</Text>
                </View>
                <View style={{paddingHorizontal: 9}}></View>
                <Text style={{color: 'white'}}>လျှင်မြန်စွာ အားသွင်းမည်</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.textContent}>
                <View style={styles.kw}>
                  <Text style={{fontSize: 9, color: 'white'}}>20 KW</Text>
                </View>
                <View style={{paddingHorizontal: 9}}></View>
                <Text style={{color: '#fff'}}>ပုံမှန် အားသွင်းမည်</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.textContent}>
                <View style={{...styles.kw, paddingHorizontal: 18}}>
                  <Text style={{fontSize: 9, color: 'white'}}>100 KW</Text>
                </View>
                <View style={{paddingHorizontal: 9}}></View>
                <Text style={{color: '#fff'}}>လျှင်မြန်စွာ အားသွင်းမည်</Text>
              </View>
            </View>
            {/* <---------> */}
          </View>
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
    marginTop: 50,
    backgroundColor: '#0D1724',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

export default MapInfoModal;
