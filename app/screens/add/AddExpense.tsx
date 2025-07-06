import React, { useState } from 'react';
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
} from 'react-native';
import * as TablerIcon from '@tabler/icons-react-native';
import { colors } from '@/app/constants/theme';
import { useNavigation } from '@react-navigation/native';
import { Categories, RootStackParamList } from '@/app/utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
} from '@/components/ui/select';
import { formatDate } from '@/app/utils/dateFormat';
import DateTimePicker from '@react-native-community/datetimepicker';

export const AddExpense = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [payerId, setPayerId] = useState('');
  const [category, setCategory] = useState<Categories>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const categoryList: Categories[] = [
    {
      id: 1,
      name: 'Food',
      description: 'Groceries and restaurants',
      icon: 'IconBasketFilled',
      bgColor: '#F87171',
    },
    {
      id: 2,
      name: 'Transport',
      description: 'Bus, train, taxi',
      icon: 'IconBus',
      bgColor: '#60A5FA',
    },
  ];

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

  const handleSubmit = () => {
    if (!payerId || !title || !amount || !category) {
      console.warn('Please fill in all fields');
      return;
    }

    const payload = {
      payerId: Number(payerId),
      title,
      amount: Number(amount),
      category,
      date: selectedDate.toLocaleString('sv-SE'),
      createdAt: new Date(Date.now()).toLocaleString('sv-SE'),
    };

    console.log('Submitting Expense:', payload);
    // You can call addExpense(payload) here
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* AppBar */}
      <View className='items-center justify-center mt-12' style={styles.appBar}>
        <TouchableOpacity
          className='w-fit absolute left-2'
          onPress={() => navigation.goBack()}>
          <TablerIcon.IconChevronLeft size={24} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.title}>Add Expense</Text>
      </View>

      {/* Placeholder to balance layout */}
      <View className='h-1/4 pl-5 justify-center'>
        <Text
          style={{ color: colors.textSecondary }}
          className='text-2xl opacity-70 mb-5'>
          {' '}
          How Much?
        </Text>
        <Text style={{ color: colors.textPrimary }} className='text-6xl'>
          {amount == '' ? 0 : amount}
        </Text>
      </View>

      {/* Bottom Sheet White Container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.sheet}>
        <ScrollView
          className='mt-5'
          contentContainerStyle={styles.sheetContent}
          keyboardShouldPersistTaps='handled'>
          <TextInput
            placeholder='Enter Payer ID'
            keyboardType='numeric'
            value={payerId}
            onChangeText={setPayerId}
            style={styles.input}
            placeholderTextColor='#999'
          />

          <TextInput
            placeholder='Enter Title'
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor='#999'
          />

          <TextInput
            placeholder='Amount'
            value={amount.toString()}
            onChangeText={setAmount}
            keyboardType='numeric'
            style={styles.input}
            placeholderTextColor='#999'
          />

          <Select
            className='mb-5 '
            selectedValue={category?.name}
            onValueChange={(val) => {
              const selected = categoryList.find((c) => c.name === val);
              if (selected) setCategory(selected);
            }}>
            <SelectTrigger
              className='justify-between rounded-xl h-14'
              variant='outline'
              size='lg'>
              <SelectInput className='py-0' placeholder='Select option' />
              <SelectIcon
                className='mr-3'
                as={TablerIcon.IconCaretDownFilled}
              />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {categoryList.map((category, index) => {
                  return (
                    <SelectItem
                      key={index}
                      label={category.name}
                      value={category.name}
                    />
                  );
                })}
              </SelectContent>
            </SelectPortal>
          </Select>

          <Pressable onPress={openDatePicker}>
            <View
              className='rounded-xl h-14 justify-center'
              style={styles.fakeInput}>
              <Text style={styles.inputText}>
                {selectedDate
                  ? formatDate(selectedDate.toString(), 'datepicker')
                  : 'DD-MM-YYYY'}
              </Text>
            </View>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              mode='date'
              value={selectedDate}
              display='default'
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sheet: {
    marginTop: 'auto',
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sheetContent: {
    paddingBottom: 100,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.text,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fakeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
});
