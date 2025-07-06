// ui/FullScreenLoader.tsx
import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

interface FullScreenLoaderProps {
  visible: boolean;
  tintColor?: string;
  loaderColor?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  visible,
  tintColor = 'rgba(0, 0, 0, 0.4)',
  loaderColor = '#AD40AF',
}) => {
  return (
    <Modal transparent animationType='fade' visible={visible}>
      <View style={[styles.overlay, { backgroundColor: tintColor }]}>
        <ActivityIndicator size='large' color={loaderColor} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullScreenLoader;
