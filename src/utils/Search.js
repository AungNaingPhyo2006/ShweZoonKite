import React, {useState} from 'react';
import {View, TextInput, FlatList, Text} from 'react-native';

const Search = ({recipeData}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const filteredData = query => {
    const filteredData = recipeData.filter(recipe => {
      const nameMatch = recipe.data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      const descriptionMatch = recipe.data.filter(item =>
        item.description.toLowerCase().includes(query.toLowerCase()),
      );
      return nameMatch.length > 0 || descriptionMatch.length > 0;
    });
    return filteredData;
  };

  const renderItem = ({item}) => (
    <View style={{padding: 10}}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="Search"
      />
      <FlatList
        data={filteredData(searchQuery)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Search;
