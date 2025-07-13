import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import * as TablerIcon from "@tabler/icons-react-native";
import { colors } from "@/app/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { Categories, RootStackParamList } from "@/app/utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { formatDate } from "@/app/utils/dateFormat";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCategoryStore } from "@/app/store/useCategoryStore.ts";
import { usePersonStore } from "@/app/store/usePersonStore";
import { MultiSelect } from "react-native-element-dropdown";
import { ExpensesDetails } from "@/app/types/expense.types";
import { useExpenseDetailStore } from "@/app/store/useExpenseStore";

export const AddExpense = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [payerId, setPayerId] = useState("");
  const [category, setCategory] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [splitInto, setSplitInto] = useState([]);

  const {
    categories,
    fetchCategories,
    loading: categoryStateLoading,
  } = useCategoryStore();

  const {
    persons,
    fetchSplitPersons,
    loading: personStateLoading,
  } = usePersonStore();

  const { addExpense } = useExpenseDetailStore();
  useEffect(() => {
    Promise.all([fetchCategories(), fetchSplitPersons()]);
  }, []);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  // open picker
  const openDatePicker = () => {
    Keyboard.dismiss();
    setTimeout(() => setShowDatePicker(true), 100);
  };

  const handleSubmit = async () => {
    const payload: Partial<ExpensesDetails> = {
      title,
      amount: Number(amount),
      category_id: category,
      date: selectedDate.toISOString().slice(0, 10),
      payer: Number(payerId),
      is_split: splitInto.length > 0,
      split_users: splitInto.map((userId) => ({
        person: userId,
        user: userId,
        amount: (Number(amount) / splitInto.length).toFixed(2), // or use your actual split logic
      })),
    };
    await addExpense(payload);
    // You can call addExpense(payload) here
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* AppBar */}
      <View className="items-center justify-center mt-12" style={styles.appBar}>
        <TouchableOpacity
          className="w-fit absolute left-2"
          onPress={() => navigation.goBack()}
        >
          <TablerIcon.IconChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Expense</Text>
      </View>

      {/* Placeholder to balance layout */}
      <View className="h-1/4 pl-5 justify-center">
        <Text
          style={{ color: colors.textSecondary }}
          className="text-2xl opacity-70 mb-5"
        >
          {" "}
          How Much?
        </Text>
        <Text style={{ color: colors.textPrimary }} className="text-6xl">
          {amount == "" ? 0 : amount}
        </Text>
      </View>

      {/* Bottom Sheet White Container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.sheet}
      >
        <ScrollView
          className="mt-5"
          contentContainerStyle={styles.sheetContent}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            placeholder="Enter Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Amount"
            value={amount.toString()}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#999"
          />

          <Select
            className="mb-5 "
            selectedValue={category}
            onValueChange={(val) => {
              console.info(val);
              setCategory(val.toString());
            }}
          >
            <SelectTrigger
              className="justify-between rounded-xl h-14"
              variant="outline"
              size="lg"
            >
              <SelectInput className="py-0" placeholder="Select Category" />
              <SelectIcon
                className="mr-3"
                as={TablerIcon.IconCaretDownFilled}
              />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {categories.map((category, index) => {
                  return (
                    <SelectItem
                      key={index}
                      label={category.name}
                      value={category.id?.toString() || ""}
                    />
                  );
                })}
              </SelectContent>
            </SelectPortal>
          </Select>

          <Select
            className="mb-5"
            placeholder="Select Payer"
            selectedValue={payerId}
            onValueChange={(val) => {
              console.warn(val);
              setPayerId(val.toString());
            }}
          >
            <SelectTrigger
              className="justify-between rounded-xl h-14"
              variant="outline"
              size="lg"
            >
              <SelectInput className="py-0" placeholder="Select Payer" />
              <SelectIcon
                className="mr-3"
                as={TablerIcon.IconCaretDownFilled}
              />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {persons.map((person, index) => {
                  return (
                    <SelectItem
                      key={index}
                      label={person.name}
                      value={person.id.toString()}
                    />
                  );
                })}
              </SelectContent>
            </SelectPortal>
          </Select>
          <Pressable onPress={openDatePicker}>
            <View
              className="rounded-xl h-14 justify-center"
              style={styles.fakeInput}
            >
              <Text style={styles.inputText}>
                {selectedDate
                  ? formatDate(selectedDate.toString(), "datepicker")
                  : "DD-MM-YYYY"}
              </Text>
            </View>
          </Pressable>

          <View className="mt-4">
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={persons.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={splitInto}
              onChange={(item) => {
                setSplitInto(item);
              }}
              selectedStyle={styles.selectedStyle}
              renderItem={(item) => {
                const isSelected = splitInto.includes(item.value);
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      backgroundColor: isSelected ? "#EEF2FF" : "white",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: isSelected ? "#4F46E5" : "#111827" }}>
                      {item.label}
                    </Text>
                    {isSelected && (
                      <TablerIcon.IconCheck size={20} color="#4F46E5" />
                    )}
                  </View>
                );
              }}
            />
          </View>

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              value={selectedDate}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </ScrollView>

        {/* Persistent Submit Button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>Add Expense</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  appBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  sheet: {
    marginTop: "auto",
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sheetContent: {},
  placeholder: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.text,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fakeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
