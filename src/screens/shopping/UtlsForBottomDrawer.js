import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';

export const animateMove = (y, toValue, callback) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true,
  }).start(finished => {
    finished && callback && callback();
  });
};

export const getNextState = (currentState, val, margin) => {
  switch (currentState) {
    case DrawerState.Peek:
      return val >= currentState + margin
        ? DrawerState.Open
        : val <= DrawerState.Peek - margin
        ? DrawerState.Closed
        : DrawerState.Peek;
    case DrawerState.Open:
      return val >= currentState
        ? DrawerState.Open
        : val <= DrawerState.Peek
        ? DrawerState.Closed
        : DrawerState.Peek;
    case DrawerState.Closed:
      return val >= currentState + margin
        ? val <= DrawerState.Peek + margin
          ? DrawerState.Peek
          : DrawerState.Open
        : DrawerState.Closed;
    default:
      return currentState;
  }
};
const DrawerState = {
  Peek: 0,
  Open: 1,
  Closed: 2,
};

const UtlsForBottomDrawer = ({children, onDrawerStateChange}) => {
  const {height} = Dimensions.get('window');

  const y = useRef(new Animated.Value(DrawerState.Closed)).current;
  const state = useRef(new Animated.Value(DrawerState.Closed)).current;
  const margin = 0.05 * height;
  const movementValue = moveY => height - moveY;

  const onPanResponderMove = (_, {moveY}) => {
    const val = movementValue(moveY);
    animateMove(y, val);
  };

  const onPanResponderRelease = (_, {moveY}) => {
    const valueToMove = movementValue(moveY);
    const nextState = getNextState(state._value, valueToMove, margin);
    state.setValue(nextState);
    animateMove(y, nextState, () => onDrawerStateChange(nextState));
  };

  const onMoveShouldSetPanResponder = (_, {dy}) => Math.abs(dy) >= 10;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: height,
          backgroundColor: '#fff',
          borderRadius: 25,
          position: 'absolute',
          bottom: -height + 30,
          transform: [{translateY: y}],
        },
      ]}
      {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

export default UtlsForBottomDrawer;

const styles = StyleSheet.create({});
