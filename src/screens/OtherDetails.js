import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import MyHeader from '../components/MyHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActualDimensions from '../utils/ActualDimensions';
// import updatedData from '../utils/data';
import updatedData from '../data/data1';
import RecipeModal from '../utils/RecipeModal';
import Search from '../utils/Search';
import NavHeader from '../utils/NavHeader';
import TextTickerScreen from '../example/TextTickerScreen';
// <-----------*********------------->
const OtherDetails = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState('');

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: ActualDimensions.width - 50,
          backgroundColor: 'lightblue',
          marginHorizontal: 15,
          marginVertical: 15,
          borderRadius: 10,
          elevation: 8,
        }}>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            height: 250,
            backgroundColor: 'blue',
            borderRadius: 10,
          }}>
          <Image source={item.photo} style={{width: '100%', height: '100%'}} />
        </View>
        <View
          style={{
            // backgroundColor: 'pink',
            marginVertical: 5,
            marginHorizontal: 15,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
          <Text>{item.description}</Text>
          {/* <Text>ingredients:{item.ingredients}</Text> */}
          {/* <Text>method:{item.method}</Text> */}
        </View>
        <View
          style={{
            marginHorizontal: 15,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              setDetails(item); // set data to modal
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'lightgray',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Icon name="rocket" size={27} color="#900" />
          </TouchableOpacity>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>Prep</Text>
            <Text style={{fontSize: 12}}>{item.prep}</Text>
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>Cook</Text>
            <Text style={{fontSize: 12}}>{item.cook}</Text>
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>Ready</Text>
            <Text style={{fontSize: 12}}>{item.ready}</Text>
          </View>
        </View>
        {/* MODAL  */}
        <RecipeModal
          modalVisible={modalVisible}
          details={details}
          onClose={() => {
            setModalVisible(false);
            setDetails('');
          }}
        />
        {/* <Modal visible={modalVisible} key={item.id.toString()}> */}
        {/* <View style={{flex: 1}}> */}
        {/* <View> */}
        {/* <View></View> */}
        {/* <View> */}
        {/* <Text>{details.name}</Text> */}
        {/* </View> */}
        {/* <TouchableOpacity */}
        {/* onPress={() => { */}
        {/* // setModalVisible(false); */}
        {/* // setDetails(''); */}
        {/* // }}> */}
        {/* <Text>close</Text> */}
        {/* </TouchableOpacity> */}
        {/* </View> */}
        {/* </View> */}
        {/* </Modal> */}
      </View>
    );
  };
  return (
    <View style={{}}>
      <NavHeader navigation={navigation} title={'Recipes Detail'} />
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
            onChangeText={text => setSearch(text)}
            value={search}
            placeholder="Search here"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('i am test');
          }}
          style={{height: '100%', padding: 5, justifyContent: 'center'}}>
          <Text>
            <Icon name="search" size={20} color="#900" />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: 15, borderLeftWidth: 5, marginTop: 15}}>
        <View style={{paddingHorizontal: 6}}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>TEAST NOW</Text>
          <Text>Stay Safe, Eat Cake.</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={updatedData}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          // ItemSeparatorComponent={() => <View style={{width: 10}} />}
        />
      </View>
      <View
        style={{
          width: '88%',
          marginHorizontal: 15,
          borderLeftWidth: 5,
          marginTop: 15,
        }}>
        <TextTickerScreen
          title={
            'Real cooking is more about following your heart than following recipes.'
          }
        />
      </View>
    </View>
  );
};

export default OtherDetails;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 60,
    width: ActualDimensions.width - 40,
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 35,
  },
  input: {
    borderRadius: 5,
    padding: 5,
  },
});
