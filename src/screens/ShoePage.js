import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const images = [
  require('../assets/images/shoe.jpg'),
  require('../assets/images/chef1024.png'),
  require('../assets/images/cookBook.png'),
  require('../assets/images/shoe.jpg'),
];

const renderItem = ({item}) => (
  <View style={{backgroundColor: '#fff', marginVertical: 5}}>
    <Image
      source={item}
      resizeMode="contain"
      style={{width: '100%', height: 200, paddingHorizontal: 15}}
    />
  </View>
);

const ShoePage = ({navigation, route}) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'pink',
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 10,
          borderRadius: 10,
          elevation: 4,
        }}>
        <View
          style={{
            // width: '100%',
            // backgroundColor: '#fff',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 15,
            marginVertical: 15,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-left" size={20} color="#000" />
            {/* <Text>Back</Text> */}
          </TouchableOpacity>
          <View style={{}}>
            <Text style={{fontWeight: 'bold'}}>Live</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('', 'Wow... I AM TEST.', [
                {text: 'ok', onPress: () => console.log('OK Pressed')},
              ]);
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'blue',
              borderRadius: 50,
            }}>
            <Image
              source={require('../assets/images/chef1024.png')}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="clock-o" size={30} color="green" />
            <Text style={{marginLeft: 9}}>23m 55s</Text>
          </View>
        </View>
        {/* <View style={{backgroundColor: '#fff', marginVertical: 5}}>
          <Image
            source={require('../assets/images/shoe.jpg')}
            resizeMode="contain"
            style={{width: '100%', height: 200, paddingHorizontal: 15}}
          />
        </View> */}
        <View
          style={{
            marginHorizontal: 15,
            paddingHorizontal: 15,
            marginVertical: 12,
          }}>
          <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={300}
            loop
            autoplay
            autoplayDelay={1000}
            autoplayInterval={3000}
            onSnapToItem={index => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={images.length - 1} //to control dot component
            activeDotIndex={activeSlide}
            containerStyle={{paddingVertical: 5}}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: '#000',
            }}
            inactiveDotStyle={{
              backgroundColor: '#ccc',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={{}}>
          {/* <Text style={{alignSelf: 'center', marginVertical: 9, fontSize: 32}}>
            ...
          </Text> */}
          <View
            style={{
              backgroundColor: 'cyan',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{marginTop: 9}}>
                <Text style={{fontSize: 16}}>YEEZY 350 BELUGA</Text>
              </View>

              <TouchableOpacity style={{marginTop: 9}}>
                <Icon name="heart" size={20} color="green" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15,
                alignItems: 'center',
              }}>
              <View>
                <Icon name="map-marker" size={20} color="green" />
              </View>
              <View style={{paddingHorizontal: 9}}>
                <Text>
                  TopShop,
                  <Text style={{fontSize: 14, color: 'pink'}}>Manchester</Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 0.5,
                borderColor: 'gray',
                marginHorizontal: 15,
                marginTop: 60,
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
              }}>
              <View style={{marginVertical: 20}}>
                <Text>Last Bid</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>$</Text>
                    <Text style={{fontSize: 24, paddingHorizontal: 5}}>
                      226.20
                    </Text>
                  </View>
                  <View style={{}}>
                    <Image
                      source={require('../assets/images/chef1024.png')}
                      style={{width: 30, height: 30, borderRadius: 50}}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginHorizontal: 60, justifyContent: 'center'}}>
                <Text style={{marginHorizontal: 30}}>Your Bid</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 30,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 12,
                      borderWidth: 1,
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>-</Text>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{marginHorizontal: 3}}>$</Text>
                    <Text
                      style={{
                        fontSize: 21,
                        justifyContent: 'center',
                        marginHorizontal: 3,
                      }}>
                      50
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 12,
                      borderWidth: 1,
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>+</Text>
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <Text style={{color: 'pink'}}>Each increase is $ 50</Text>
                </View>
              </View>
            </View>

            <View style={{alignItems: 'center', marginVertical: 40}}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('', 'Wow...i am Get bid.', [
                    {text: 'ok', onPress: () => console.log('OK Pressed')},
                  ]);
                }}
                style={{
                  backgroundColor: '#000',
                  height: 50,
                  width: '90%',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>Get bid $50.00</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShoePage;

const styles = StyleSheet.create({});
