import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from "react-native";
import SmsAndroid from "react-native-get-sms-android";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { extractAmount, guessCategory } from "../utils/smsUtils";

type UnbilledTransaction = {
  id: number;
  sender: string;
  body: string;
  amount: number;
  date: string;
  category: string;
};

export const UnbilledTransactionScreen = () => {
  const [transactions, setTransactions] = useState<UnbilledTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSMS = async () => {
    try {
      console.log(Platform.OS);
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS
        );
        console.log("granted");
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn("SMS permission denied");
          setLoading(false);
          return;
        }

        SmsAndroid.list(
          JSON.stringify({ box: "inbox", maxCount: 100 }),
          (fail) => {
            console.error("Failed:", fail);
            setLoading(false);
          },
          (count, smsList) => {
            const messages = JSON.parse(smsList);
            const parsed: UnbilledTransaction[] = messages
              .filter((msg: any) => /debited|spent|txn|payment/i.test(msg.body))
              .map((msg: any, idx: number) => {
                const amount = extractAmount(msg.body);
                return {
                  id: idx,
                  sender: msg.address,
                  body: msg.body,
                  amount: amount || 0,
                  date: new Date(msg.date).toISOString(),
                  category: guessCategory(msg.body),
                };
              })
              .filter((tx) => tx.amount > 0);

            setTransactions(parsed);
            setLoading(false);
          }
        );
      }
    } catch (error) {
      console.error("Error reading SMS", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const requestSmsPermission = async () => {
      console.log("Requesting SMS permission...");
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: "SMS Access",
            message: "This app needs access to your SMS to detect expenses.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        console.log("granted:", granted);
        fetchSMS();
      } catch (err) {
        console.error("Permission error:", err);
      }
    };

    requestSmsPermission();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-500">Reading messages...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <Heading size="md" className="mb-2">
        Unbilled Transactions
      </Heading>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card className="p-4 mb-3 rounded-xl border border-gray-200 bg-gray-50">
            <Text className="font-bold text-lg text-gray-900">
              ₹{item.amount.toFixed(2)} — {item.category}
            </Text>
            <Text className="text-sm text-gray-600">{item.sender}</Text>
            <Text className="text-xs text-gray-400 mt-1" numberOfLines={2}>
              {item.body}
            </Text>
            <Text className="text-xs text-gray-400 mt-1">
              {new Date(item.date).toLocaleString()}
            </Text>
          </Card>
        )}
      />
    </View>
  );
};
