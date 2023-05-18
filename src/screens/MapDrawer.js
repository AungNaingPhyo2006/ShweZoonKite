import {
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  Easing,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const MapDrawer = ({isDrawerOpen, navigation, toggleDrawer}) => {
  const drawerAnimation = new Animated.Value(0);

  useEffect(() => {
    if (isDrawerOpen) {
      console.log('ISDRAWER IN PROGRESS', isDrawerOpen);
      // Open drawer animation
      Animated.timing(drawerAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      // Close drawer animation
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, [isDrawerOpen]);

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  return (
    <Modal visible={isDrawerOpen} transparent>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{translateX: drawerTranslateX}],
              opacity: drawerAnimation,
            },
          ]}>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={toggleDrawer}>
              <View style={styles.icon1}>
                <Icon name="arrow-left" size={24} color={'white'} />
              </View>
            </TouchableOpacity>
          </View>
          {/* Text---------> */}
          <View style={styles.textContainer}>
            <View style={{paddingVertical: 9}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                မင်္ဂလာပါ!
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <TouchableOpacity
                style={styles.textContent}
                onPress={() => Alert.alert('', 'အားသွင်းတိုင်များရှာဖွေခြင်း')}>
                <Icon name="map-pin" size={24} color={'white'} />
                <View style={{marginHorizontal: 9}}>
                  <Text style={styles.text}>အားသွင်းတိုင်များရှာဖွေခြင်း</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textContent}
                onPress={() => Alert.alert('', 'ကားအငှား၀န်ဆောင်မှု')}>
                <IconFontAwesome name="car" size={22} color={'white'} />
                <View style={{marginHorizontal: 9}}>
                  <Text style={styles.text}>ကားအငှား၀န်ဆောင်မှု</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textContent}
                onPress={() => Alert.alert('', 'ကိုယ်ပိုင်အချက်အလက်')}>
                <IconFontAwesome name="user" size={24} color={'white'} />
                <View style={{marginHorizontal: 9}}></View>
                <Text style={styles.text}>ကိုယ်ပိုင်အချက်အလက်</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textContent}
                onPress={() => Alert.alert('', 'ပြင်ဆင်ရန်')}>
                <IconFontAwesome name="gear" size={24} color={'#EAEAEA'} />
                <View style={{marginHorizontal: 9}}></View>
                <Text style={styles.text}>ပြင်ဆင်ရန်</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textContent}
                onPress={() => Alert.alert('', 'မှတ်တမ်းများ')}>
                <IconFontAwesome name="history" size={24} color={'white'} />
                <View style={{marginHorizontal: 9}}></View>
                <Text style={styles.text}>မှတ်တမ်းများ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textContent}
                onPress={() => Alert.alert('', 'အသိပေးချက်များ')}>
                <Icon name="bell" size={24} color={'#EAEAEA'} />
                <View style={{marginHorizontal: 9}}></View>
                <Text style={styles.text}>အသိပေးချက်များ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default MapDrawer;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0D1724',
    justifyContent: 'flex-end',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#000',
    padding: 16,
    zIndex: 10000,
  },
  openButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 9999,
  },
  icon1: {},
  textContainer: {
    // backgroundColor: 'blue',
    marginHorizontal: 15,
    marginTop: 50,
  },
  textContent: {
    marginVertical: 16,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});