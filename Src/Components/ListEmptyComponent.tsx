import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ListEmptyComponent = ({
  errorText = 'No data found',
  alignItems = 'center',
}) => {
  return (
    <View style={[styles.container, {alignItems: alignItems}]}>
      <Image
        source={require('../Assets/empty_inbox.png')}
        style={{
          height: 70,
          width: 70,
        }}
      />
      <Text>{errorText}</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
