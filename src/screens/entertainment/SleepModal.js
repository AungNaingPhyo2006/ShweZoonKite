import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SleepModal = ({visible, onClose, onSelect, onStop}) => {
  const sleepTimes = [5, 10, 15, 30, 45, 60]; // 'stop'

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'rgba(0,0,0,0.5)',
          marginHorizontal: 12,
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
              Choose sleep timer
            </Text>
            <View style={{paddingHorizontal: 60}}></View>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'pink',
                alignItems: 'center',
                borderRadius: 50,
              }}>
              <Icon name="times" size={28} backgroundColor="transparent" />
            </TouchableOpacity>
          </View>
          {sleepTimes.map((time, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(time)}
              style={styles.taskTitle}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 16,
                  marginBottom: 10,
                }}>
                {time === 60 ? '1 hour' : `${time} minutes`}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={onStop}
            style={{...styles.taskTitle, marginVertical: 15}}>
            <Text style={{fontSize: 16, color: 'red', alignItems: 'center'}}>
              Reset Timer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SleepModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  taskTitle: {
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
});
