import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';

const SleepModal = ({visible, onClose, onSelect, onStop}) => {
  const sleepTimes = [5, 10, 15, 20, 25, 30, 60]; // 'stop'

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            Choose sleep time
          </Text>
          {sleepTimes.map(time => (
            <TouchableOpacity key={time} onPress={() => onSelect(time)}>
              <Text style={{fontSize: 16, marginBottom: 10}}>
                {time} minutes
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onStop}>
            <Text style={{fontSize: 16, color: 'red'}}>Stop Timer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={{fontSize: 16, color: 'blue'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SleepModal;
