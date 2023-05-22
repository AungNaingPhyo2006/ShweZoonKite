import * as React from 'react';
import {
  Image,
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

// We need to get the height of the phone and use it relatively,
// This is because height of phones vary
const windowHeight = Dimensions.get('window').height;

const SubText = ({
  borderWidth,
  borderColor,
  text,
  size,
  color,
  family,
  letterSpacing,
  align = 'left',
  leading,
}) => {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        fontFamily: family,
        letterSpacing: letterSpacing ? letterSpacing : -0.02,
        textAlign: align,
        lineHeight: leading,
        borderWidth: borderWidth,
        borderColor: borderColor,
      }}>
      {text}
    </Text>
  );
};

// The good thing is none of these values are required, so if you don't have all the values, the app will not break.
// If you are using TypeScript feel free to add the '?' to make them optional while initialising props

const HeadingText = ({
  borderWidth,
  borderColor,
  text,
  size,
  color,
  family,
  letterSpacing,
  align = 'left',
  leading,
}) => {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        fontFamily: family,
        letterSpacing: letterSpacing ? letterSpacing : -0.02,
        textAlign: align,
        lineHeight: leading,
        borderWidth: borderWidth,
        borderColor: borderColor,
      }}>
      {text}
    </Text>
  );
};
export default function DrawerFooter() {
  // This state would determine if the drawer sheet is visible or not
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);

  // Function to open the bottom sheet
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleOpenBottomSheet}
        style={{
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#86827e',
          paddingVertical: 12,
          borderRadius: 8,
        }}>
        <SubText text={'Open Drawer'} color={'#86827e'} size={16} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetOpen}
        // We pass our function as default function to close the Modal
        onRequestClose={handleCloseBottomSheet}>
        <View style={[styles.bottomSheet, {height: windowHeight * 0.7}]}>
          {/* // First Section of Bottom sheet with Header and close button */}
          <View
            style={{
              flex: 0,
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <SubText
              text={'Preview'}
              family={'Poppins-med'}
              size={16}
              color={'#86827e'}
            />
            <TouchableOpacity onPress={handleCloseBottomSheet}>
              <IconFontAwesome name="close" size={24} color={'#514BC3'} />
            </TouchableOpacity>
          </View>
          {/* // First Section of Bottom sheet with Header and close button // */}
          {/* Section with Information */}
          <ScrollView style={{paddingVertical: 16}}>
            <SubText
              text={'Unyime Emmanuel'}
              family={'PoppinsSBold'}
              color={'#292929'}
              size={18}
            />
            <SubText
              text={`I'm a Software Engineer and Technical Writer, I've had the TypeScript epiphany!. Oh, I play Chess too!`}
              family={'Poppins'}
              color={'#86827e'}
              size={14}
            />

            <View
              style={{
                opacity: 0.2,
                height: 1,
                borderWidth: 1,
                borderColor: '#86827e',
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 0,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <SubText
                text={'24'}
                color={'#292929'}
                family={'PoppinsSBold'}
                size={24}
              />
              <SubText
                text={' articles written'}
                color={'#86827e'}
                size={14}
                family={'Poppins-med'}
              />
            </View>

            <View style={{paddingTop: 16}}>
              <SubText
                text={'Views (30 days)'}
                color={'#86827e'}
                size={12}
                family={'Poppins-med'}
              />
              <SubText
                text={'4,904'}
                color={'#292929'}
                family={'PoppinsSBold'}
                size={18}
              />
            </View>

            <View style={{paddingTop: 16}}>
              <SubText
                text={'Views (30 days)'}
                color={'#86827e'}
                size={12}
                family={'Poppins-med'}
              />
              <HeadingText
                text={'4,904'}
                color={'#292929'}
                family={'PoppinsSBold'}
                size={18}
              />
            </View>

            <View style={{paddingTop: 16}}>
              <SubText
                text={'Reads (30 days)'}
                color={'#86827e'}
                size={12}
                family={'Poppins-med'}
              />
              <HeadingText
                text={'3038'}
                color={'#292929'}
                family={'PoppinsSBold'}
                size={18}
              />
            </View>

            <View style={{paddingTop: 16, flex: 0, flexDirection: 'row'}}>
              <IconFontAwesome name="map" size={24} color={'#514BC3'} />

              <View style={{paddingLeft: 12}} />
              <SubText
                text={'Medium'}
                color={'#86827e'}
                size={14}
                family={'Poppins-med'}
              />
            </View>
          </ScrollView>
          {/* Section with Information */}
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'red',
  },
});
