import React from 'react';
import { Pressable, ScrollView, SectionList, View } from 'react-native';
import * as TablerIcon from '@tabler/icons-react-native';
import { VStack } from '@/components/ui/vstack';
import { CategoryCard } from './CategoryCard';
import { formatDate } from '@/app/utils/dateFormat';
import {
  Categories,
  ExpensesDetails,
  RootStackParamList,
} from '@/app/utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export const ExpenseList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return <View>ExpenseList</View>;
};
