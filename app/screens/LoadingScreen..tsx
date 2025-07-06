// ui/LoadingScreen.tsx
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const LoadingScreen = () => {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <ActivityIndicator size='large' color='#AD40AF' />
    </View>
  );
};

export default LoadingScreen;
