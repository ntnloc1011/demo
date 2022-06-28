/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useMemo, useRef, useCallback, useEffect} from 'react';
import {StyleSheet, View, Animated, Easing} from 'react-native';

const CandleChart = ({percentOut, percentIn}) => {
  const animPriceIn = useRef(new Animated.Value(0)).current;
  const animPriceOut = useRef(new Animated.Value(0)).current;
  const progressChart = useCallback(() => {
    Animated.parallel([
      Animated.timing(animPriceIn, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(animPriceOut, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  }, [animPriceIn, animPriceOut]);

  useEffect(() => {
    progressChart();
  }, [progressChart]);

  const tranformAnimPriceIn = useMemo(
    () =>
      animPriceIn.interpolate({
        inputRange: [0, 1],
        outputRange: [0, percentIn],
      }),
    [animPriceIn, percentIn],
  );

  const tranformAnimPriceOut = useMemo(
    () =>
      animPriceOut.interpolate({
        inputRange: [0, 1],
        outputRange: [0, percentOut],
      }),
    [animPriceOut, percentOut],
  );

  return (
    <View style={{flexDirection: 'row', marginBottom: -1}}>
      <View style={styles.chartCandle}>
        <Animated.View
          style={{
            height: tranformAnimPriceIn,
            width: 17,
            backgroundColor: '#0093D3',
            marginRight: 6,
          }}
        />
        <Animated.View
          style={{
            height: tranformAnimPriceOut,
            width: 17,
            backgroundColor: '#F2C94C',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartCandle: {
    width: 180,
    borderBottomWidth: 1,
    marginRight: 10,
    borderColor: '#E0E0E0',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default CandleChart;
