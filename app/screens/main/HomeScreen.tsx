import { FlatList, Pressable, SafeAreaView, View } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { ExpenseList } from '@/app/components/common/ExpenseList';
import BalanceCard from '@/app/components/common/BalanceCard';
import { useCategoryStore } from '@/app/store/useCategoryStore.ts';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Categories, RootStackParamList } from '@/app/utils/types';
import { CategoryCard } from '@/app/components/common/CategoryCard';

export default function HomeScreen() {
  const { categories, load, hasMore, loading } = useCategoryStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    load();
  }, []);
  return (
    <SafeAreaView>
      <BalanceCard balance={2548} income={1840} expenses={284} />

      <Heading size='sm' className='text-gray-500 mb-2 ml-2 px-3'>
        Category
      </Heading>
      <FlatList
        className='px-5 pt-3 pb-8'
        data={categories}
        renderItem={({ item, index }) => {
          const category: Categories = {
            name: item.name,
            bgColor: item.bgColor,
            description: item.description,
            icon: item.icon,
            id: item.id,
          };
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('Screens', {
                  screen: 'CategoryDetails',
                  params: {
                    id: item.id,
                    name: item.name,
                    bgColor: item.bgColor,
                    description: item.description,
                    icon: item.icon,
                  },
                });
              }}>
              <CategoryCard category={category} description='' key={index} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (hasMore && !loading) load();
        }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
