import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, SectionList, View } from "react-native";
import { CategoryCard } from "../../components/common/CategoryCard";
import { Heading } from "@/components/ui/heading";
import { formatDate } from "../../utils/dateFormat";
import SegmentTabs from "../../components/common/SegmentTabs";
import { Pressable } from "@/components/ui/pressable";
import { Categories, RootStackParamList } from "@/app/utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useExpenseDetailStore } from "@/app/store/useExpenseStore";
import TransactionList from "../TransactionsList";
import { UnbilledTransactionScreen } from "../UnbilledTransactions";

export const ExpenseScreen = () => {
  const { groupedExpensed, fetchExpenses } = useExpenseDetailStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<"transactions" | "unbilled">(
    "unbilled"
  );
  const tabs = [
    { key: "unbilled", label: "Unbilled Transactions" },
    { key: "transactions", label: "Transactions" },
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleLoadMore = () => {};

  return (
    <View className=" bg-white">
      <SegmentTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as "transactions" | "unbilled")}
      />
      {activeTab === "transactions" ? (
        <TransactionList groupedExpenses={groupedExpensed} />
      ) : (
        // unbilled transaction screen
        <UnbilledTransactionScreen />
      )}
    </View>
  );
};
