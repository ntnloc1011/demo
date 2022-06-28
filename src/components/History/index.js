/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput, FlatList} from 'react-native';
import Tabs from '../Tabs';

import images from '../../../src/assets/images';
import {ACTION_TYPE, MOCK_TRANSACTIONS} from '../../../src/Mock';
export function formatCurrency(n) {
  if (!n) {
    return n;
  }
  return n.replace(/./g, (c, i, a) =>
    i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? `.${c}` : c,
  );
}
const ITEM_HEIGHT_VERTICAL = 104 + 4 * 2;

const HistoryTransactions = () => {
  const [tabActive, setTabActive] = useState('all');
  const [valueSearch, setValueSearch] = useState('');
  const [data, setData] = useState(MOCK_TRANSACTIONS);

  const typeAction = useMemo(
    () =>
      tabActive === 'in'
        ? [ACTION_TYPE.IN]
        : tabActive === 'out'
        ? [ACTION_TYPE.OUT]
        : [ACTION_TYPE.IN, ACTION_TYPE.OUT],
    [tabActive],
  );

  const generateTabs = useCallback(() => {
    return {
      all: {
        label: 'Tất cả',
        onPress: () => {
          setTabActive('all');
          setData(
            MOCK_TRANSACTIONS.filter(item =>
              valueSearch
                ? item.label.toLowerCase().includes(valueSearch.toLowerCase())
                : true,
            ),
          );
        },
      },
      in: {
        label: 'Tiền vào',
        onPress: () => {
          setTabActive('in');
          setData(
            MOCK_TRANSACTIONS.filter(
              item => item.type === ACTION_TYPE.IN,
            ).filter(item =>
              valueSearch
                ? item.label.toLowerCase().includes(valueSearch.toLowerCase())
                : true,
            ),
          );
        },
      },
      out: {
        label: 'Tiền ra',
        onPress: () => {
          setTabActive('out');
          setData(
            MOCK_TRANSACTIONS.filter(
              item => item.type === ACTION_TYPE.OUT,
            ).filter(item =>
              valueSearch
                ? item.label.toLowerCase().includes(valueSearch.toLowerCase())
                : true,
            ),
          );
        },
      },
    };
  }, [valueSearch]);

  const onSearch = useCallback(
    val => {
      setValueSearch(val);
      if (!val) {
        setData(MOCK_TRANSACTIONS);
      } else {
        setData(
          MOCK_TRANSACTIONS.filter(
            item =>
              typeAction.includes(item.type) &&
              item.label.toLowerCase().includes(val.toLowerCase()),
          ),
        );
      }
    },
    [typeAction],
  );

  const TABS = useMemo(() => generateTabs(), [generateTabs]);

  const renderItem = useMemo(
    () =>
      ({item, index}) => {
        const isOut = item?.type === ACTION_TYPE.OUT;
        return (
          <View style={styles.itemHistory}>
            <Text style={styles.textItemDate}>{item.charge_date}</Text>
            <Text style={styles.textItemLabel}>{item.label}</Text>
            <View
              style={[
                styles.priceContainer,
                {
                  width: 18 * `${item.price}`.length,
                  backgroundColor: isOut ? 'rgba(255, 45, 85, 0.1)' : '#E7F2E6',
                },
              ]}>
              <Text
                style={{
                  color: isOut ? '#C61031' : '#184D0D',
                  fontWeight: '600',
                  fontSize: 12,
                  lineHeight: 16,
                }}>
                {`${isOut ? '-' : '+'} ${formatCurrency(
                  item.price.toString(),
                )} ${item.currency}`}
              </Text>
            </View>
          </View>
        );
      },
    [],
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>LỊCH SỬ GIAO DỊCH</Text>
      <View style={styles.contentInput}>
        <Image style={styles.iconSearch} source={images.SEARCH} />
        <TextInput
          value={valueSearch}
          style={styles.textInput}
          placeholderTextColor="#9197A3"
          placeholder="Tìm kiếm"
          onChangeText={onSearch}
        />
      </View>
      <Text style={styles.note}>
        Tìm kiếm theo tài khoản chuyển, loại giao dịch, thông tin thụ hưởng, mã
        đăng nhập, số giao dịch...
      </Text>
      <View
        style={[
          styles.flexRowCenter,
          {justifyContent: 'space-between', marginTop: 24},
        ]}>
        <View>
          <Text style={styles.textLabelCalendar}>Từ ngày</Text>
          <View style={styles.containerCalendar}>
            <Text style={styles.textChooseDate}>Chọn ngày</Text>
            <Image style={styles.iconCalendar} source={images.CALENDAR} />
          </View>
        </View>
        <View>
          <Text style={styles.textLabelCalendar}>Đến ngày</Text>
          <View style={styles.containerCalendar}>
            <Text style={styles.textChooseDate}>Chọn ngày</Text>
            <Image style={styles.iconCalendar} source={images.CALENDAR} />
          </View>
        </View>
      </View>
      <Tabs tabs={TABS} tabActive={tabActive} />
      <FlatList
        scrollEnabled={false}
        keyExtractor={(_, i) => i.toString()}
        data={data}
        contentContainerStyle={{marginTop: 16}}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT_VERTICAL,
          offset: ITEM_HEIGHT_VERTICAL * index,
          index,
        })}
        renderItem={renderItem}
      />
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
  contentInput: {
    paddingHorizontal: 4,
    backgroundColor: '#EBEBF0',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  textInput: {
    fontSize: 14,
    lineHeight: 20,
    width: '100%',
  },
  iconSearch: {
    width: 15,
    height: 15,
    marginHorizontal: 8,
  },
  iconCalendar: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
  },
  containerCalendar: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#DBDEE5',
    width: 163,
    height: 46,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  note: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 16,
    color: '#4C5466',
  },
  itemHistory: {
    height: 104,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#DBDEE5',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  priceContainer: {
    marginTop: 8,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabelCalendar: {
    marginBottom: 8,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#101434',
  },
  textChooseDate: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6C6C70',
    fontWeight: '400',
  },
  textItemDate: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#101434',
  },
  textItemLabel: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#333333',
  },
});

export default HistoryTransactions;
