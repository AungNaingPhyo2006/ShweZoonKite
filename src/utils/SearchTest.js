import React, {useState} from 'react';
import {Alert, Image} from 'react-native';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActualDimensions from '../utils/ActualDimensions';
import recipeData from '../data/recipeData';
const SearchTest = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    setSearchText(text);
    const newData = recipeData[0].data.filter(item => {
      const itemName = item.name.toLowerCase();
      const itemDesc = item.description.toLowerCase();
      const textData = text.toLowerCase();
      return itemName.includes(textData) || itemDesc.includes(textData);
    });
    setFilteredData(newData);
  };

  const handleClear = () => {
    setSearchText('');
    setFilteredData([]);
  };
  const handleSearchAlert = () => {
    Alert.alert('', 'Please search recipe name and description!');
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View
          style={{
            height: '100%',
            width: '90%',
            justifyContent: 'center',
          }}>
          <TextInput
            numberOfLines={1}
            style={styles.input}
            onChangeText={text => handleSearch(text)}
            value={searchText}
            placeholder="Search recipe name or description"
          />
        </View>
        {searchText !== '' ? (
          <TouchableOpacity
            onPress={handleClear}
            style={{height: '100%', padding: 5, justifyContent: 'center'}}>
            <Text>
              <Icon name="times" size={20} color="#900" />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSearchAlert}
            style={{height: '100%', padding: 5, justifyContent: 'center'}}>
            <Text>
              <Icon name="search" size={20} color="#900" />
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <--------------> */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 15,
          borderRadius: 10,
          backgroundColor: 'pink',
        }}>
        <TextInput
          placeholder="Search recipe name or description"
          style={{
            height: 50,
            paddingHorizontal: 5,
            // backgroundColor: 'blue',
          }}
          value={searchText}
          onChangeText={text => handleSearch(text)}
          // onChangeText={text => setSearchText(text)}
        />
        {searchText !== '' && (
          <TouchableOpacity
            onPress={handleClear}
            style={{
              height: 50,
              // backgroundColor: 'pink',
              justifyContent: 'center',
            }}>
            <Icon name="times" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View> */}
      <View>
        {searchText !== '' ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.taskTitle}
                onPress={() => {
                  navigation.navigate('RecipeDetails', {item: item});
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {item.name}
                </Text>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
              padding: 20,
              margin: 20,
              height: ActualDimensions.width - 40,
              borderRadius: 20,
            }}>
            {/* <Text>Search</Text> */}
            <Image
              source={require('../assets/images/chef1024.png')}
              style={{width: 150, height: 150, borderRadius: 100}}
            />
          </View>
        )}
      </View>
    </View>
  );
};
export default SearchTest;

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 12},
  inputContainer: {
    flexDirection: 'row',
    height: 60,
    width: ActualDimensions.width - 40,
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 15,
    marginHorizontal: 9,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 35,
  },
  input: {
    borderRadius: 5,
    padding: 5,
  },
  taskTitle: {
    fex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    marginVertical: 10,
  },
});
