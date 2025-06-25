// components/common/CustomTabBar.tsx

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useDialogStore } from '@/app/store/useDialogStore';
import { useBreakpoint } from '@/app/utils/useBreakpoint';
import { colors } from '@/app/constants/theme';
import { Box } from '@/components/ui/box';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Navbar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const tabWidth = width / 5;

  const renderTab = (route: any, index: number) => {
    const isFocused = state.index === index;
    const { options } = descriptors[route.key];
    const iconName = getIconName(route.name);

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <TouchableOpacity
        key={route.key}
        onPress={onPress}
        style={[styles.tabButton, { width: tabWidth }]}
        activeOpacity={0.7}>
        <Ionicons
          name={iconName}
          size={24}
          color={isFocused ? colors.primary : '#999'}
        />
      </TouchableOpacity>
    );
  };

  const getIconName = (name: string) => {
    switch (name) {
      case 'Home':
        return 'home-outline';
      case 'Transactions':
        return 'list-outline';
      case 'Expense':
        return 'cash-outline';
      case 'Settings':
        return 'settings-outline';
      default:
        return 'ellipse-outline';
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Box style={[styles.container, isLandscape && styles.landscapeContainer]}>
        {/* Left tabs: Home, Transactions */}
        {renderTab(state.routes[0], 0)}
        {renderTab(state.routes[1], 1)}

        {/* Center Add Button */}
        <View style={{ width: tabWidth, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => useDialogStore.getState().openDialog('add')}
            style={styles.addButton}
            activeOpacity={0.8}>
            <Ionicons name='add' size={30} color='#fff' />
          </TouchableOpacity>
        </View>

        {/* Right tabs: Expense, Settings */}
        {renderTab(state.routes[2], 2)}
        {renderTab(state.routes[3], 3)}
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    padding: 0,
    margin: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'black', // or your theme background
  },
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  landscapeContainer: {
    height: 60,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: colors.primary, // primary
    width: 58,
    height: 58,
    borderRadius: 29,
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -60, // elevate above navbar
  },
});
