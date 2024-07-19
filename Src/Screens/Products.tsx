import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getProductsService} from '../Services/APIServices';
import {
  useCartList,
  useCategoryList,
  useProductList,
} from '../Utilities/StoreData';
import {useAppDispatch} from '../Store';
import {
  StoreCartList,
  StoreCategoryList,
  StoreProductList,
} from '../Store/Slices/ProductSlice';
import {
  BOX_SHADOW,
  WINDOW_WIDTH,
  activeOpacityValue,
} from '../Utilities/Constants';
import {getAmountFormat} from '../Utilities/generalMethods';
import ListEmptyComponent from '../Components/ListEmptyComponent';
import Toast from 'react-native-simple-toast';
import Loader from '../Components/Loader';

const IMG_SIZE = (WINDOW_WIDTH - 70) / 2;

const Products = () => {
  const productList = useProductList();
  const categoryList = useCategoryList();
  const cartList = useCartList();
  const dispatch = useAppDispatch();
  const [selectedCategory, setselectedCategory] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    getProductsApiCall();
  }, []);

  const getProductsApiCall = () => {
    setisLoading(true);
    getProductsService()
      .then(res => {
        if (res.data.products) {
          dispatch(StoreProductList([...res.data.products]));
          getCategoryList(res.data.products);
        }
      })
      .catch(error => {
        console.log(error, 'ERROR');
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const getCategoryList = (productList = []) => {
    let categoryTemp: string[] = [];
    productList.forEach(ele => {
      if (!categoryTemp.includes(ele.category)) {
        categoryTemp.push(ele.category);
      }
    });
    dispatch(StoreCategoryList([...categoryTemp]));
  };

  const getProductList = () => {
    if (selectedCategory) {
      return productList.filter(ele => ele.category === selectedCategory);
    }
    return productList;
  };

  const handleselectCategory = (category: string) => {
    setselectedCategory(pre => (pre === category ? null : category));
  };

  const handleAddToCart = product => {
    let temp = [...cartList];
    temp.push({...product, quantity: product.minimumOrderQuantity});

    Toast.show('Product Added to cart', Toast.SHORT);
    dispatch(StoreCartList(temp));
  };

  const handleDeleteProduct = (productId: number) => {
    let temp = [...cartList].filter(ele => ele.id !== productId);
    Toast.show('Product Removed Suceessfully', Toast.SHORT);
    dispatch(StoreCartList(temp));
  };

  const RenderItem = ({item, index}) => {
    const isInCart = cartList.findIndex(ele => ele.id === item.id) !== -1;
    return (
      <View style={styles.productContainer}>
        <Image
          source={{uri: item.thumbnail}}
          style={styles.img}
          alt="Product"
        />
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{getAmountFormat(item.price)}</Text>
        <Text style={styles.text}>rating: {item.rating}</Text>
        <TouchableOpacity
          activeOpacity={activeOpacityValue}
          style={styles.addButton}
          onPress={() => {
            if (isInCart) {
              handleDeleteProduct(item.id);
            } else {
              handleAddToCart(item);
            }
          }}>
          <Text style={{color: '#fff'}}>
            {isInCart ? 'Remove' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Loader isVisible={isLoading} />
      <View style={[styles.rowStyle, {marginVertical: 10}]}>
        {categoryList.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryContainer,
              cat === selectedCategory
                ? {
                    backgroundColor: '#FFD3B6',
                  }
                : {},
            ]}
            activeOpacity={activeOpacityValue}
            onPress={() => {
              handleselectCategory(cat);
            }}>
            <Text style={{color: '#000'}}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={[...getProductList()]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({index, item}) => <RenderItem index={index} item={item} />}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 3,
          rowGap: 15,
          paddingVertical: 15,
        }}
        ListEmptyComponent={() => <ListEmptyComponent />}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          //   justifyContent: 'space-between',
          columnGap: 15,
        }}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  rowStyle: {
    flexDirection: 'row',
    columnGap: 10,
  },
  categoryContainer: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    backgroundColor: '#FFF8F3',
    borderColor: '#F7E7DC',
  },
  productContainer: {
    backgroundColor: '#fff',
    // alignItems: 'center',
    width: IMG_SIZE + 10,
    padding: 5,
    justifyContent: 'flex-end',
    borderRadius: 5,
    ...BOX_SHADOW,
  },
  img: {
    height: IMG_SIZE,
    width: IMG_SIZE,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  text: {
    color: '#000',
  },
  addButton: {
    marginVertical: 10,
    backgroundColor: '#E0A75E',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: IMG_SIZE - 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
