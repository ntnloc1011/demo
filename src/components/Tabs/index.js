/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Tabs = ({tabs = [], tabActive}) => {
  const handlePress = key => {
    tabs[key].onPress && tabs[key].onPress();
  };

  const wrapper = [styles.wrapperTabs, {marginTop: 16}];
  const tabArrs = Object.keys(tabs);
  return (
    <View style={wrapper}>
      {tabArrs.map(key => {
        const active = tabActive === key;
        return (
          <View
            key={key}
            style={{
              flexDirection: 'column',
              width: `${100 / tabArrs.length}%`,
            }}>
            <TouchableOpacity
              style={[styles.flexRowCenter]}
              onPress={() => handlePress(key)}>
              <Text
                style={[
                  styles.textTabs,
                  active ? styles.textActiveStyle : styles.inTextActiveStyle,
                ]}>
                {tabs[key].label}
              </Text>
            </TouchableOpacity>
            <View
              style={[
                {
                  backgroundColor: active ? '#0093D3' : '#E0E0E0',
                  height: active ? 2 : 1,
                },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapperTabs: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  textActiveStyle: {
    color: '#0093D3',
    marginBottom: 8,
  },

  inTextActiveStyle: {
    fontWeight: '400',
    marginBottom: 8,
    color: '#4C5466',
  },
});

export default Tabs;
