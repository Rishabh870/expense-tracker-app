import { Card } from "@/components/ui/card";
import React from "react";
import { Text, View } from "react-native";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconChevronUp,
  IconDotsVertical,
} from "@tabler/icons-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/app/constants/theme";

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  income,
  expenses,
}) => {
  return (
    <Card className="rounded-2xl p-0 mx-4 my-4">
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-6 shadow-lg"
        style={{
          borderRadius: 12, // 👈 Equivalent to rounded-2xl
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        {/* Top Row */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white font-semibold text-lg">
            Remaining Balance
          </Text>
          <IconDotsVertical size={22} color={"white"} />
        </View>

        {/* Balance Amount */}
        <Text className="text-white text-4xl font-extrabold tracking-wide mb-6">
          ₹{balance.toFixed(2)}
        </Text>

        {/* Footer Row */}
        <View className="flex-row justify-between items-center">
          {/* Allocated */}
          <View className="flex-row items-center gap-1">
            <IconTrendingUp size={18} color="#a3e635" />
            <Text className="text-gray-200 text-sm font-medium">Allocated</Text>
            <Text className="text-white text-base font-semibold ml-1">
              ₹{income.toFixed(2)}
            </Text>
          </View>

          {/* Spent */}
          <View className="flex-row items-center gap-1">
            <IconTrendingDown size={18} color="#f87171" />
            <Text className="text-gray-200 text-sm font-medium">Spent</Text>
            <Text className="text-white text-base font-semibold ml-1">
              ₹{expenses.toFixed(2)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Card>
  );
};

export default BalanceCard;
