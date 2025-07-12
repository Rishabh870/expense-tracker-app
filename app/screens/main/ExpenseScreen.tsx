import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, SectionList, View } from 'react-native';
import { CategoryCard } from '../../components/common/CategoryCard';
import { Heading } from '@/components/ui/heading';
import { formatDate } from '../../utils/dateFormat';
import SegmentTabs from '../../components/common/SegmentTabs';
import { usetransactionStore } from '@/app/store/useTransactionStore';
import { Pressable } from '@/components/ui/pressable';
import { Categories, RootStackParamList } from '@/app/utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export const ExpenseScreen = () => {
  const load = usetransactionStore((s) => s.load);
  const grouped = usetransactionStore((s) => s.grouped);
  const unbilled = usetransactionStore((s) => s.unbilled);
  const loadMore = usetransactionStore((s) => s.loadMore);
  const hasMore = usetransactionStore((s) => s.hasMore);
  const loading = usetransactionStore((s) => s.loading);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<'transactions' | 'unbilled'>(
    'unbilled',
  );
  const tabs = [
    { key: 'unbilled', label: 'Unbilled Transactions' },
    { key: 'transactions', label: 'Transactions' },
  ];

  useEffect(() => {
    load();
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) loadMore();
  };

  return (
    <View className=' bg-white'>
      <SegmentTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as 'transactions' | 'unbilled')}
      />
      {activeTab === 'transactions' ? (
        // transaction screen
        <SectionList
          className='h-full px-4'
          sections={Object.entries(grouped).map(([date, data]) => ({
            title: formatDate(date),
            data,
          }))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                const data: Categories = item.category;
                navigation.navigate('Screens', {
                  screen: 'ExpenseDetails',
                  params: {
                    name: item.title,
                    categoryName: data.name,
                    bgColor: data.bgColor,
                    description: data.description,
                    icon: data.icon,
                    amount: item.amount,
                    id: item.id,
                  },
                });
              }}>
              <CategoryCard
                key={index}
                title={item.title}
                category={item.category}
                description={item.category.description}
                amount={item.amount}
                isBilled={item.billed}
              />
            </Pressable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Heading size='sm' className='text-gray-500 mt-4 mb-2 ml-4'>
              {title}
            </Heading>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          stickySectionHeadersEnabled={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      ) : (
        // unbilled transaction screen
        <FlatList
          className='h-full px-4'
          data={unbilled}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                const data: Categories = item.category;
                navigation.navigate('Screens', {
                  screen: 'ExpenseDetails',
                  params: {
                    name: item.title,
                    categoryName: data.name,
                    bgColor: data.bgColor,
                    description: data.description,
                    icon: data.icon,
                    amount: item.amount,
                    id: item.id,
                  },
                });
              }}>
              <CategoryCard
                key={index}
                category={item.category}
                description={item.category.description}
                amount={item.amount}
                isBilled={item.billed}
              />
            </Pressable>
          )}
          contentContainerStyle={{ paddingVertical: 12 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};
