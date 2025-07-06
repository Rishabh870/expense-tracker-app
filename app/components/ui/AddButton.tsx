import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { DialogType, useDialogStore } from '@/app/store/useDialogStore';
import * as TablerIcon from '@tabler/icons-react-native';
import { colors } from '@/app/constants/theme';
import { useNavigation } from '@react-navigation/native';
import { AddStackParamList, RootStackParamList } from '@/app/utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const AddButton = ({ tabWidth }: { tabWidth: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const rotation = useRef(new Animated.Value(0)).current;
  const animations = [
    useRef(new Animated.Value(0)).current, // for Add Category
    useRef(new Animated.Value(0)).current, // for Add Transaction
    useRef(new Animated.Value(0)).current, // for Add Unbilled
  ];

  const toggleSpeedDial = () => {
    if (isOpen) {
      // Close all
      Animated.parallel([
        Animated.timing(rotation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        ...animations.map((a) =>
          Animated.timing(a, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ),
      ]).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      // Open all
      Animated.parallel([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        ...animations.map((a, i) =>
          Animated.spring(a, {
            toValue: 1,
            useNativeDriver: true,
            speed: 14,
            bounciness: 8,
          }),
        ),
      ]).start();
    }
  };

  const rotationStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };
  return (
    <View style={{ alignItems: 'center' }}>
      {/* Speed Dial Items */}
      {isOpen && (
        <View style={styles.speedDialContainer}>
          {[
            { label: 'Add Category', offset: -170, screen: 'AddCategory' },
            {
              label: 'Add Transaction',
              offset: -120,
              screen: 'AddTransactions',
            },
            { label: 'Add Expense', offset: -70, screen: 'AddExpense' },
          ].map((item, index) => {
            const translateY = animations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, item.offset],
            });

            const opacity = animations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            });

            return (
              <Animated.View
                key={item.label}
                style={[
                  styles.speedDialButton,
                  {
                    transform: [{ translateY }],
                    opacity,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    toggleSpeedDial(); // close speed dial first
                    navigation.navigate('Add', {
                      screen: item.screen as keyof AddStackParamList,
                    }); // navigate to screen
                  }}>
                  <Text style={styles.speedDialLabel}>{item.label}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      )}

      {/* Main FAB */}
      <Pressable
        onPress={toggleSpeedDial}
        style={styles.addButton}
        android_ripple={{ color: '#fff' }}>
        <Animated.View style={rotationStyle}>
          <TablerIcon.IconPlus color='#fff' />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { backgroundColor: '#fff' },
  container: {
    flexDirection: 'row',
    height: 60,
    elevation: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  landscapeContainer: {
    paddingHorizontal: 10,
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    top: -20,
    elevation: 5,
  },
  speedDialContainer: {
    position: 'absolute',
    bottom: 70,
    alignItems: 'center',
    zIndex: 10,
  },
  speedDialButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 3,
    position: 'absolute',
  },
  speedDialLabel: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
});
