import {
  Alert,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import recipeData from '../../data/recipeData';
import NavHeader from '../../utils/NavHeader';
import SearchTest from '../../utils/SearchTest';
import Search from '../../utils/Search';

const CookPage = ({navigation}) => {
  const renderMenu = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RecipeDetails', {item: item});
          }}
          style={styles.card}>
          <Text style={styles.taskItem}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderHeader = ({section}) => {
    return (
      <View>
        <Text style={styles.taskTitle}>{section.title} </Text>
      </View>
    );
  };
  const SearchMe = data => {
    navigation.navigate('SearchRecipes', {setData: data});
  };

  return (
    <View style={styles.container}>
      <NavHeader navigation={navigation} title={'Recipes'} />
      <Search onPress={() => SearchMe(recipeData)} />

      <SectionList
        sections={recipeData}
        renderItem={renderMenu}
        renderSectionHeader={renderHeader}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CookPage;

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
