/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';

import images from './src/assets/images';
import Charts from './src/components/Charts';
import HistoryTransactions from './src/components/History';

const Header = () => {
  return (
    <View style={[styles.sectionContainer]}>
      <Image style={styles.iconBack} source={images.ARROW_LEFT} />
      <Text style={styles.sectionTitleHeader}>Lịch sử giao dịch</Text>
    </View>
  );
};

const App = () => {
  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor={'#0093D3'} />
        <ScrollView nestedScrollEnabled={false}>
          <Header />
          <Charts />
          <HistoryTransactions />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#0093D3',
    paddingVertical: 11,
  },
  flexRowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitleHeader: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
    color: '#ffffff',
  },
  iconBack: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
    top: 11,
  },
});

export default App;
