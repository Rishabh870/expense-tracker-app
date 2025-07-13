// components/screens/TransactionList.tsx
import React from "react";
import { SectionList, View } from "react-native";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { Categories, RootStackParamList } from "@/app/utils/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ExpensesDetails } from "../types/expense.types";
import { formatDate } from "../utils/dateFormat";
import { CategoryItem } from "../types/category.types";
import { CategoryCard } from "../components/common/CategoryCard";

interface Props {
  groupedExpenses: {
    date: Date;
    expenses: ExpensesDetails[];
  }[];
}

const TransactionList: React.FC<Props> = ({ groupedExpenses }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLoadMore = () => {};

  return (
    <SectionList
      className="h-full px-4"
      sections={groupedExpenses.map(({ date, expenses }) => ({
        title: formatDate(date.toString()),
        data: expenses,
      }))}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            const data: CategoryItem = item.category;
            navigation.navigate("Screens", {
              screen: "ExpenseDetails",
              params: {
                name: item.title,
                categoryName: data.name,
                bgColor: data.bgColor,
                description: data.description,
                icon: data.icon || "",
                amount: item.amount,
                id: item.id,
              },
            });
          }}
        >
          <CategoryCard
            title={item.title}
            category={item.category}
            description={item.category.name}
            amount={item.amount}
            isBilled={item.billed}
          />
        </Pressable>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Heading size="sm" className="text-gray-500 mt-4 mb-2 ml-4">
          {title.toString()}
        </Heading>
      )}
      contentContainerStyle={{ paddingBottom: 100 }}
      stickySectionHeadersEnabled={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default TransactionList;
