import React, {useState} from 'react';
import {Alert} from 'react-native';
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

const SearchTest = ({navigation, setData}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    setSearchText(text);
    const newData = setData[0].data.filter(item => {
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

  return (
    <View style={styles.container}>
      <View
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {searchText !== '' ? (
          <FlatList
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
          <>
            <Text>Search</Text>
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default SearchTest;

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 12},
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
