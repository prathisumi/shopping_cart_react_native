import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loader = ({isVisible = false}) => {
  const RenderLoader = () => {
    return (
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.4)'}]}>
        <ActivityIndicator size={'large'} color={'#E68369'} />
      </View>
    );
  };

  return isVisible ? <RenderLoader /> : null;
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
});
