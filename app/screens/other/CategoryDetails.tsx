import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
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
import { SettlementDetailCard } from '@/app/components/common/SettlementDetailCard';
import { useSettlementStore } from '@/app/store/useSettlementStore';
import { useExpenseDetailStore } from '@/app/store/useExpenseStore';
import * as TablerIcon from '@tabler/icons-react-native';

type CategoryDetailsRouteProp = RouteProp<
  ScreensStackParamList,
  'CategoryDetails'
>;

var backgroundcolor;

export const CategoryDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CategoryDetailsRouteProp>();
  const { name, id, icon, bgColor, description } = route.params;

  const { fetchExpensesByCategory, getExpensesByCategory, hasMore, loading } =
    useExpenseDetailStore();

  const DynamicIcon = TablerIcon[
    icon as keyof typeof TablerIcon
  ] as React.ComponentType<any>;

  const [categoryExpenses, setCategoryExpenses] = useState<ExpensesDetails[]>(
    [],
  );

  useEffect(() => {
    fetchExpensesByCategory(id); // Load initial data
  }, []);

  useEffect(() => {
    setCategoryExpenses(getExpensesByCategory(id));
  }, [getExpensesByCategory(id)]); // Update when store updates

  return (
    <SafeAreaView style={{ backgroundColor: bgColor }}>
      {/* AppBar */}
      <View
        className='items-center h-[6%] w-full justify-center mt-12 mb-4 '
        style={styles.appBar}>
        <TouchableOpacity
          className='w-fit left-2'
          onPress={() => navigation.goBack()}>
          <IconChevronLeft size={24} color='#fff' />
        </TouchableOpacity>
        <Text className='mx-auto' style={styles.title}>
          Category Expenses
        </Text>
        <TablerIcon.IconPencil color='#fff' size={24} />
      </View>

      {/* Placeholder to balance layout */}
      <View
        style={{ backgroundColor: bgColor }}
        className=' h-[27%] my-auto justify-center items-center'>
        <DynamicIcon size={70} color='#fff' />

        <Text style={{ color: colors.textSecondary }} className='text-2xl '>
          {name}
        </Text>

        <Text
          style={{ color: colors.textSecondary }}
          className='text-lg opacity-70 mb-2'>
          {description}
        </Text>
      </View>

      {/* Bottom Sheet White Container */}
      <View className=' h-[67%]' style={styles.sheet}>
        <FlatList
          className='px-5 pt-3 pb-8 h-full'
          data={categoryExpenses}
          renderItem={({ item, index }) => (
            <View key={index}>
              <SettlementDetailCard data={item} isBilled />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => {
            if (hasMore && !loading) {
              fetchExpensesByCategory(id);
            }
          }}
          onEndReachedThreshold={0.5}
        />
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
