import { SettlementCard } from '@/app/components/common/SettlementCard';
import { colors } from '@/app/constants/theme';
import { useSettlementStore } from '@/app/store/useSettlementStore';
import { Button, ButtonText } from '@/components/ui/button';

import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from '../LoadingScreen.';
import { RootStackParamList } from '@/app/utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const SettlementScreen = () => {
  const { settlements, fetchSettlements, loading, hasMore, resetSettlements } =
    useSettlementStore();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchSettlements();
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchSettlements();
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <View className='bg-white h-full'>
      <FlatList
        className='px-4'
        data={settlements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              const name = item.other_person.name;
              navigation.navigate('Screens', {
                screen: 'SettlementDetails',
                params: {
                  name: name,
                  number: item.other_person.phone,
                  id: item.id,
                  expense_Id: item.expense_id,
                },
              });
            }}>
            <SettlementCard
              key={index}
              name={item.other_person.name}
              phone={item.other_person.phone}
              amount={item.amount}
              type={item.direction}
            />
          </Pressable>
        )}
        onEndReached={handleLoadMore}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size='large' color={colors.primary} />
          ) : null
        }
      />
      <Button
        onPress={() => {
          resetSettlements(), fetchSettlements();
        }}>
        <ButtonText>Reset list</ButtonText>
      </Button>
    </View>
  );
};

export default SettlementScreen;
