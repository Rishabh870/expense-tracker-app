import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import { IconChevronLeft } from '@tabler/icons-react-native';
import { colors } from '@/app/constants/theme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList, ScreensStackParamList } from '@/app/utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useExpenseDetailStore } from '@/app/store/useExpenseStore';
import * as TablerIcon from '@tabler/icons-react-native';
import ItemCard from '@/app/components/common/ItemCard';

type ExpenseDetailsRouteProp = RouteProp<
  ScreensStackParamList,
  'ExpenseDetails'
>;

var backgroundcolor;

export const ExpenseDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ExpenseDetailsRouteProp>();
  const { name, categoryName, amount, bgColor, description, icon, type, id } =
    route.params;

  const DynamicIcon = TablerIcon[
    icon as keyof typeof TablerIcon
  ] as React.ComponentType<any>;
  backgroundcolor = bgColor;

  const { expenseById, fetchExpenseById } = useExpenseDetailStore();

  useEffect(() => {
    fetchExpenseById(id);
  }, []);

  const expense = expenseById[id];

  if (!expense) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        {/* AppBar */}
        <View
          className='items-center h-[5%] w-full justify-center mt-12 mb-4 '
          style={styles.appBar}>
          <TouchableOpacity
            className='w-fit left-2'
            onPress={() => navigation.goBack()}>
            <IconChevronLeft size={24} color='#fff' />
          </TouchableOpacity>
          <Text className='mx-auto' style={styles.title}>
            {name}
          </Text>
          <TablerIcon.IconPencil color='#fff' size={24} />
        </View>
        {/* Loader or Placeholder */}
        <View className='flex-1 justify-center items-center'>
          <Text style={{ color: '#fff' }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ backgroundColor: bgColor }}>
      {/* AppBar */}
      <View
        className='items-center h-[5%] w-full justify-center mt-12 mb-4 '
        style={styles.appBar}>
        <TouchableOpacity
          className='w-fit left-2'
          onPress={() => navigation.goBack()}>
          <IconChevronLeft size={24} color='#fff' />
        </TouchableOpacity>
        <Text className='mx-auto' style={styles.title}>
          Expense Details
        </Text>

        <TablerIcon.IconPencil color='#fff' size={24} />
      </View>

      {/* Placeholder to balance layout */}
      <View className='h-[27%] my-auto justify-center items-center'>
        <DynamicIcon size={70} color='#fff' />

        <Text
          style={{ color: colors.textSecondary }}
          className='text-xl opacity-90 mb-2'>
          {name}
        </Text>

        {amount && (
          <Text style={{ color: colors.textPrimary }} className='text-5xl mt-5'>
            ₹{amount}
          </Text>
        )}
      </View>

      {/* Bottom Sheet White Container */}
      <View className='h-[68%]' style={styles.sheet}>
        <ScrollView className='p-4'>
          {expenseById[id]!.items.map((item, index) => {
            return <ItemCard item={item} key={index} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  appBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: backgroundcolor,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sheet: {
    marginTop: 'auto',
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 10,
  },
  sheetContent: {
    paddingBottom: 100,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
