import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BackgroundService from 'react-native-background-actions';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const veryIntensiveTask = async taskDataArguments => {
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log(i);
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'http://schemas.android.com/apk/res/android', //
  parameters: {
    delay: 1000,
  },
};

const Timertest = () => {
  const [isActive, setIsActive] = useState(false);
  const [test, setTest] = useState(0);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTest(0);
  };

  React.useEffect(() => {
    let intervalId = null;
    if (isActive) {
      intervalId = setInterval(() => {
        setTest(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isActive]);

  const handleStartService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const handleStopService = async () => {
    await BackgroundService.stop();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
        Timer: {test}
      </Text>
      <TouchableOpacity
        onPress={toggleTimer}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: isActive ? 'red' : 'green',
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontSize: 18}}>
          {isActive ? 'Stop' : 'Start'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleStartService}
        style={{
          marginTop: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: 'blue',
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontSize: 18}}>Start Service</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleStopService}
        style={{
          marginTop: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: 'orange',
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontSize: 18}}>Stop Service</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Timertest;

const styles = StyleSheet.create({});

//<------------Original------------------>

// import {Button, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import BackgroundTimer from 'react-native-background-actions';

// const Timertest = () => {
//   const [timer, setTimer] = useState(0);
//   const [intervale, setIntervale] = useState(0);
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     let intervalId = null;
//     if (isActive) {
//       intervalId = setInterval(() => {
//         setTimer(timer => timer + 1);
//       }, 1000);
//     } else if (!isActive && timer !== 0) {
//       //clear the interval when the component unmounts
//       clearInterval(intervalId);
//     }
//     //clear the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, [isActive, timer]);

//   //console.log(timer);
//   const stopTimer = () => {
//     //  clearInterval(intervale);
//     // setTimer(null);
//     // setIntervale(null);
//     setIsActive(false);
//   };
//   const startTimer = () => {
//     // const intervalId = setInterval(() => {
//     //   setTimer(prev => prev + 1);
//     // }, 1000);
//     // setIntervale(intervalId);
//     setIsActive(true);
//     //  setTimer(0);
//   };

//   return (
//     <View style={{justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Timertest</Text>
//       <Text>{timer}</Text>
//       <Button
//         title={isActive ? 'Stop' : 'Start'}
//         onPress={isActive ? stopTimer : startTimer}
//       />
//     </View>
//   );
// };

// export default Timertest;

// const styles = StyleSheet.create({});
