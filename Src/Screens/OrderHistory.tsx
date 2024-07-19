import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ListEmptyComponent from '../Components/ListEmptyComponent';
import {useOrderList} from '../Utilities/StoreData';
import {useAppDispatch} from '../Store';
import {useIsFocused} from '@react-navigation/native';
import {getAmountFormat, getFormatedDate} from '../Utilities/generalMethods';
import {ORDER_LIST_KEY} from '../Utilities/StoreKeys';
import {StoreOrderList} from '../Store/Slices/ProductSlice';
import {retrieveData} from '../Utilities/StoreMethods';
import {BOX_SHADOW} from '../Utilities/Constants';

const OrderHistory = () => {
  const orderList = useOrderList();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getOrderList();
    }
  }, [isFocused]);

  const getOrderList = async () => {
    const order = await retrieveData(ORDER_LIST_KEY);
    dispatch(StoreOrderList(order));
  };

  const RenderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.rowStyle}>
          <Text style={styles.text}>Order id: {item.id}</Text>
          <Text style={styles.text}> Total: {item.total}</Text>
        </View>
        <Text style={styles.text}>{getFormatedDate(item.date)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[...orderList]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({index, item}) => <RenderItem index={index} item={item} />}
        ListEmptyComponent={() => <ListEmptyComponent />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 3,
          rowGap: 15,
          paddingVertical: 15,
        }}
      />
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  productContainer: {
    backgroundColor: '#fff',
    // width: IMG_SIZE + 10,
    padding: 5,
    borderRadius: 5,
    ...BOX_SHADOW,
  },
  text: {
    color: '#000',
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
