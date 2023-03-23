import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShowModal = ({navigation, modalVisible, setModalVisible}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Contact us!</Text> */}

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                Linking.openURL(
                  'https://www.facebook.com/profile.php?id=100090265536147',
                )
              }>
              <Icon name="facebook" size={27} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonPhone]}
              onPress={() => Linking.openURL('tel:+959698822511')}>
              <Icon name="phone" size={27} color="#900" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonPhone]}
              onPress={() => Linking.openURL('viber://pa?chatURI=myviberchat')}>
              {/* <Text style={[styles.textStyle, {color: 'blue'}]}>Viber</Text> */}
              <Icon name="mobile" size={27} color="#686de0" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={[styles.button, styles.buttonClose]}>
              <Icon name="times" size={24} color="#900" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShowModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
  },

  button: {
    borderRadius: 50,
    width: 45,
    height: 45,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 8,
    elevation: 2,
  },
  buttonPhone: {
    backgroundColor: 'pink',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
  },
});
