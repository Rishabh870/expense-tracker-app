import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { IconChevronLeft } from '@tabler/icons-react-native';
import { colors } from '@/app/constants/theme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  ExpensesDetails,
  RootStackParamList,
  ScreensStackParamList,
} from '@/app/utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useExpenseDetailStore } from '@/app/store/useExpenseStore';
import ItemCard from '@/app/components/common/ItemCard';
import * as TablerIcon from '@tabler/icons-react-native';
import { stringToColor } from '@/app/components/ui/Avatar';

type SettlementDetailsRouteProp = RouteProp<
  ScreensStackParamList,
  'SettlementDetails'
>;

export const SettlementDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<SettlementDetailsRouteProp>();
  const { name, number, id, expense_Id } = route.params;

  const { expenseById, fetchExpenseById } = useExpenseDetailStore();
  const [expense, setExpense] = useState<ExpensesDetails | undefined>(
    expenseById[expense_Id],
  );

  const DynamicIcon = TablerIcon[
    expense?.category.icon as keyof typeof TablerIcon
  ] as React.ComponentType<any>;

  const color = stringToColor(name!);

  useEffect(() => {
    if (!expense) {
      fetchExpenseById(expense_Id);
    }
  }, [expense_Id]);

  useEffect(() => {
    setExpense(expenseById[expense_Id]);
  }, [expenseById]);

  if (!expense) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
    <SafeAreaView style={{ backgroundColor: color }}>
      {/* AppBar */}
      <View
        className={`items-center justify-center mt-12 bg-[${color}]`}
        style={styles.appBar}>
        <TouchableOpacity
          className='w-fit absolute left-2'
          onPress={() => navigation.goBack()}>
          <IconChevronLeft size={24} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
      </View>

      {/* Placeholder to balance layout */}
      <View className='min-h-72 my-auto justify-center items-center'>
        <DynamicIcon size={70} color='#fff' />
        <Text
          style={{ color: colors.textSecondary }}
          className='text-xl opacity-90 mb-2'>
          {expense?.title}
        </Text>
        <Text style={{ color: colors.textPrimary }} className='text-5xl mt-5'>
          ₹{expense?.amount}
        </Text>
      </View>

      {/* Bottom Sheet White Container */}
      <View className='h-full ' style={styles.sheet}>
        {expense ? (
          <ScrollView
            className='px-4 pt-4'
            showsVerticalScrollIndicator={false}>
            {/* Item Details */}
            <Text className='text-xl font-semibold mt-6 mb-5'>
              Expense Items
            </Text>

            {expense.items.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.placeholder}>Loading expense...</Text>
        )}
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
    paddingBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
});
