import { FlatList, Pressable, SafeAreaView, View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { ExpenseList } from "@/app/components/common/ExpenseList";
import BalanceCard from "@/app/components/common/BalanceCard";
import { useCategoryStore } from "@/app/store/useCategoryStore.ts";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Categories, RootStackParamList } from "@/app/utils/types";
import { CategoryCard } from "@/app/components/common/CategoryCard";
import { CategoryItem } from "@/app/types/category.types";

export default function HomeScreen() {
  const { categories, fetchCategories, net_budget, hasMore, loading } =
    useCategoryStore();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <SafeAreaView>
      <BalanceCard
        balance={(net_budget?.amount || 0) - (net_budget?.spent || 0)}
        income={net_budget?.amount || 0}
        expenses={net_budget?.spent || 0}
      />

      <Heading size="sm" className="text-gray-500 mb-2 ml-2 px-3">
        Category
      </Heading>
      <FlatList
        className="px-5 pt-3 pb-8"
        data={categories}
        renderItem={({ item, index }) => {

          return (
            <Pressable
              onPress={() => {
                navigation.navigate("Screens", {
                  screen: "CategoryDetails",
                  params: {
                    id: item.id || 0,
                    name: item.name,
                    bgColor: item.bgColor,
                    description: item.description,
                    icon: item.icon || "",
                  },
                });
              }}
            >
              <CategoryCard category={item} description="" key={index} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id?.toString()}
        onEndReached={() => {
          if (hasMore && !loading) fetchCategories();
        }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
