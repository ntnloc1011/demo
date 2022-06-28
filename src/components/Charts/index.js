/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

import {
  TAP_DATE_CHARTS,
  MOCK_TRANSACTIONS,
  ACTION_TYPE,
} from '../../../src/Mock';
import {formatCurrency} from '../History';
import CandleChart from './CandleChart';

const Charts = () => {
  const [tabActive, setTabActive] = useState(0);

  const totalPrice = MOCK_TRANSACTIONS.reduce((arg, cur) => arg + cur.price, 0);

  const totalPriceIn = useMemo(
    () =>
      MOCK_TRANSACTIONS.filter(item => item.type === ACTION_TYPE.IN).reduce(
        (arg, cur) => arg + cur.price,
        0,
      ),
    [],
  );

  const totalPriceOut = useMemo(
    () =>
      MOCK_TRANSACTIONS.filter(item => item.type === ACTION_TYPE.OUT).reduce(
        (arg, cur) => arg + cur.price,
        0,
      ),
    [],
  );

  const percentIn = useMemo(
    () => (totalPriceIn / totalPrice) * 100,
    [totalPriceIn, totalPrice],
  );

  const percentOut = useMemo(
    () => (totalPriceOut / totalPrice) * 100,
    [totalPriceOut, totalPrice],
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>TỔNG THU CHI</Text>

      <View style={[styles.flexRowCenter, {justifyContent: 'space-between'}]}>
        {TAP_DATE_CHARTS.map((item, i) => {
          const active = tabActive === i;
          return (
            <Pressable
              onPress={() => setTabActive(i)}
              key={i}
              style={
                active
                  ? styles.pressableContainerActive
                  : styles.pressableContainer
              }>
              <Text
                style={[
                  styles.pressableText,
                  active && {
                    color: '#0093D3',
                    fontSize: 13,
                    lineHeight: 18,
                    fontWeight: '600',
                  },
                ]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <CandleChart percentIn={percentIn} percentOut={percentOut} />
        <View>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <View
              style={{
                width: 20,
                height: 12,
                borderRadius: 20,
                backgroundColor: '#0093D3',
                marginRight: 8,
              }}
            />
            <View>
              <Text style={styles.textTitlePrice}>Tổng thu (VND)</Text>
              <Text style={styles.textPrice}>{`${formatCurrency(
                totalPriceIn.toString(),
              )} (VND)`}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              marginTop: 12,
            }}>
            <View
              style={{
                width: 20,
                height: 12,
                borderRadius: 20,
                backgroundColor: '#F2C94C',
                marginRight: 8,
              }}
            />
            <View>
              <Text style={styles.textTitlePrice}>Tổng chi (VND)</Text>
              <Text style={styles.textPrice}>{`${formatCurrency(
                totalPriceOut.toString(),
              )} (VND)`}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 16,
  },
  flexRowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#101434',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
  },
  pressableText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#4C5466',
  },
  pressableTextActive: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#0093D3',
  },
  pressableContainer: {
    width: 108,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
  },
  pressableContainerActive: {
    width: 108,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5EDF9',
    borderRadius: 10,
  },
  chartCandle: {
    width: 180,
    borderBottomWidth: 1,
    marginRight: 10,
    borderColor: '#E0E0E0',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textTitlePrice: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: '#101434',
  },
  textPrice: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#101434',
  },
});

export default Charts;
