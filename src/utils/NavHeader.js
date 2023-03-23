import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MyHeader from '../components/MyHeader';
import ShowModal from './ShowModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavHeader = ({navigation, title}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 15,
          backgroundColor: 'pink',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          {/* <Text style={{color: 'darkblue'}}>Back</Text> */}
          <Icon name="arrow-left" size={24} color="darkblue" />
        </TouchableOpacity>
        <View style={{}}>
          <Text style={{color: 'darkblue', fontWeight: 'bold'}}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Icon name="coffee" size={24} color="darkblue" />
        </TouchableOpacity>
      </View>
      <ShowModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default NavHeader;

const styles = StyleSheet.create({});
