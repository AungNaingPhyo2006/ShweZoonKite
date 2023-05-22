import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const backdropCom = () => {
  <View style={[styles.backdrop, {marginTop: 120}]}></View>;
};
const BottomSheetCom = () => {
  const bottomSheetModalRef = useRef(null);

  // const openBottomSheet = () => {
  //   bottomSheetModalRef.current.present();
  // };

  // const closeBottomSheet = () => {
  //   bottomSheetModalRef.current.dismiss();
  // };
  bottomSheetModalRef.current?.present();

  return (
    <View style={styles.container}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={['20%', '50%', '80%']}
          initialSnapIndex={0}
          overlay={false}
          dismissOnPanDown={false} // Disable dismissing on pan down
          dismissOnTapOutside={false} // Disable dismissing on tap outside
          backdropComponent={backdropCom}>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>Bottom Sheet Content</Text>
            <IconFontAwesome name="filter" size={22} color={'blue'} />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default BottomSheetCom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
});
