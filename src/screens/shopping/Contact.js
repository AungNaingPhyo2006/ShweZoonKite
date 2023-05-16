import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import Contacts from 'react-native-contacts';

//go to register at AndroidManifest.xml file located android/app/src/main
const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const requestContactPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          readContacts();
        } else {
          console.log('Contacts permission denied');
        }
      } catch (error) {
        console.log('Error requesting contacts permission:', error);
      }
    };

    requestContactPermission();
  }, []);

  const readContacts = () => {
    Contacts.getAll()
      .then(contactList => {
        setContacts(contactList);
      })
      .catch(error => {
        console.log('Error reading contacts:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{...styles.taskTitle, color: 'blue'}}>Contact List</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {contacts.map(contact => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                if (contact.phoneNumbers.length > 0) {
                  const phoneNumber = contact.phoneNumbers[0].number;
                  Linking.openURL(`tel:${phoneNumber}`);
                } else {
                  Alert.alert('No phone number found for contact');
                }
              }}
              key={contact.recordID}>
              <Text
                style={{
                  ...styles.taskTitle,
                  paddingVertical: 15,
                  color: 'red',
                }}>
                {contact.displayName}
              </Text>
            </TouchableOpacity>
            {/* <Text style={{marginVertical: 26}}>---> </Text> */}
            <TouchableOpacity
              onPress={() => {
                if (contact.phoneNumbers.length > 0) {
                  const phoneNumber = contact.phoneNumbers[0].number;
                  Linking.openURL(`sms:${phoneNumber}`);
                } else {
                  Alert.alert('No phone number found for contact');
                }
              }}
              key={contact.recordID}>
              <Text
                style={{
                  ...styles.taskTitle,
                  paddingVertical: 15,
                }}>
                s
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eafffe',
  },
  taskItem: {
    // padding: 10,
    color: '#888',
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  taskTitle: {
    backgroundColor: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
