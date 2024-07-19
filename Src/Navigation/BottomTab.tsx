import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Products from '../Screens/Products';
import Cart from '../Screens/Cart';
import OrderHistory from '../Screens/OrderHistory';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              source={require('../Assets/home.png')}
              style={{height: size - 3, width: size - 3}}
              tintColor={focused ? '#8D493A' : '#000'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              source={require('../Assets/cart.png')}
              style={{height: size, width: size}}
              tintColor={focused ? '#8D493A' : '#000'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              source={require('../Assets/order_history.png')}
              style={{height: size, width: size}}
              tintColor={focused ? '#8D493A' : '#000'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
