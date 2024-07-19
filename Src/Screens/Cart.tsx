import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useCartList, useOrderList} from '../Utilities/StoreData';
import {useAppDispatch} from '../Store';
import {useIsFocused} from '@react-navigation/native';
import {getAmountFormat} from '../Utilities/generalMethods';
import {
  BOX_SHADOW,
  WINDOW_WIDTH,
  activeOpacityValue,
} from '../Utilities/Constants';
import ListEmptyComponent from '../Components/ListEmptyComponent';
import {storeData} from '../Utilities/StoreMethods';
import {ORDER_LIST_KEY} from '../Utilities/StoreKeys';
import {StoreCartList} from '../Store/Slices/ProductSlice';
import Toast from 'react-native-simple-toast';

const IMG_SIZE = (WINDOW_WIDTH - 100) / 3;

const Cart = ({navigation}) => {
  const cartList = useCartList();
  const orderList = useOrderList();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  //   useEffect(() => {
  //     console.log(cartList, 'CART');
  //   }, [isFocused]);

  const getTotalAmount = () => {
    let total = cartList.reduce((result, item) => {
      let temp = item.price * item.quantity;
      result += temp;
      return result;
    }, 0);

    return getAmountFormat(total);
  };

  const handlePlaceOrder = async () => {
    const date = new Date();
    const temp = {
      id: date.getTime().toString(),
      total: getTotalAmount(),
      date: date,
    };
    await storeData(ORDER_LIST_KEY, [...orderList, temp]);
    dispatch(StoreCartList([]));
    Toast.show('Order Placed Suceessfully', Toast.SHORT);
    navigation.navigate('OrderHistory');
  };

  const handleProductQuantity = ({
    minQuantity = 1,
    product_id,
    type,
  }: {
    minQuantity: number;
    product_id: number;
    type: 'add' | 'minus';
  }) => {
    let temp = [...cartList];
    let tempIndex = temp.findIndex(ele => ele.id == product_id);
    if (tempIndex !== -1) {
      if (type === 'add') {
        temp[tempIndex] = {
          ...temp[tempIndex],
          quantity: parseInt(temp[tempIndex].quantity) + 1,
        };
      } else {
        const newValue = temp[tempIndex].quantity - 1;
        temp[tempIndex] = {
          ...temp[tempIndex],
          quantity: newValue > minQuantity ? newValue : minQuantity,
        };
      }
    }
    dispatch(StoreCartList(temp));
  };

  const handleDeleteProduct = (productId: number) => {
    let temp = [...cartList].filter(ele => ele.id !== productId);
    Toast.show('Product Removed Suceessfully', Toast.SHORT);
    dispatch(StoreCartList(temp));
  };

  const RenderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: item.thumbnail}}
            style={styles.img}
            alt="Product"
          />
        </View>
        <View style={{width: WINDOW_WIDTH - (IMG_SIZE + 50)}}>
          <View style={styles.rowStyle}>
            <Text style={styles.text}>{item.title}</Text>
            <TouchableOpacity
              // style={[styles.imgContainer, {padding: 5}]}
              activeOpacity={activeOpacityValue}
              onPress={() => {
                handleDeleteProduct(item.id);
              }}>
              <Image
                source={require('../Assets/delete.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.text}>{getAmountFormat(item.price)}</Text>
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={[styles.imgContainer, {padding: 5}]}
                activeOpacity={activeOpacityValue}
                onPress={() => {
                  handleProductQuantity({
                    product_id: item.id,
                    type: 'add',
                    minQuantity: item.minimumOrderQuantity,
                  });
                }}>
                <Image
                  source={require('../Assets/add.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.text}> {item.quantity}</Text>
              <TouchableOpacity
                style={[styles.imgContainer, {padding: 5}]}
                activeOpacity={activeOpacityValue}
                onPress={() => {
                  handleProductQuantity({
                    product_id: item.id,
                    type: 'minus',
                    minQuantity: item.minimumOrderQuantity,
                  });
                }}>
                <Image
                  source={require('../Assets/minus.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[...cartList]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({index, item}) => <RenderItem index={index} item={item} />}
        ListEmptyComponent={() => (
          <ListEmptyComponent errorText="Cart is Empty" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 3,
          rowGap: 15,
          paddingVertical: 15,
        }}
      />
      <View style={styles.rowStyle}>
        <Text style={styles.text}>Total: {getTotalAmount()}</Text>
        {cartList.length ? (
          <TouchableOpacity
            activeOpacity={activeOpacityValue}
            style={styles.addButton}
            onPress={() => {
              handlePlaceOrder();
            }}>
            <Text style={{color: '#fff'}}>Place Order</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5F5',
    paddingHorizontal: 15,
  },
  productContainer: {
    // alignItems: 'center',
    // width: IMG_SIZE + 10,
    // padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    columnGap: 10,
  },
  img: {
    height: IMG_SIZE,
    width: IMG_SIZE,
  },
  text: {
    color: '#000',
  },
  rowStyle: {
    flexDirection: 'row',
    // columnGap: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#E0A75E',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: IMG_SIZE,
    borderRadius: 10,
    alignSelf: 'center',
  },
  icon: {
    height: 20,
    width: 20,
    borderRadius: 3,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  imgContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    ...BOX_SHADOW,
  },
});
