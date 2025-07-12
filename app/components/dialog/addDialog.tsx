// components/dialogs/AddDialog.tsx
import { useDialogStore } from '@/app/store/useDialogStore';
import { useExpenseStore } from '@/app/store/useExpenseStore';
import { Category, Expense } from '@/app/utils/types';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { ChevronDownIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
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
import { useRef, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from '@/components/ui/text';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { formatDate } from '@/app/utils/dateFormat';
import { TextInput, Keyboard } from 'react-native';

export const AddDialog = () => {
  const { closeDialog } = useDialogStore();
  const { addExpense } = useExpenseStore();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState<Omit<Expense, 'id'>>();

  const categoryList: Category[] = [
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

  const handleSelectCategory = (val: string) => {
    setSelectedCategory(val);
    const category = categoryList.find((c) => c.name === val);
    if (category) {
      // setForm((prev) => ({
      //   ...prev,
      //   category,
      // }));
    }
  };

  const handleChange = (field: string, value: string | number) => {};

  const onSubmit = async () => {
    await addExpense(form); // `form` already matches the expected structure
  };

  const inputRef = useRef<TextInput>(null);

  return (
    <AlertDialog isOpen onClose={closeDialog} size='md'>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className='text-typography-950 font-semibold' size='md'>
            Add Expense
          </Heading>
        </AlertDialogHeader>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ paddingBottom: 32 }}>
          <AlertDialogBody className='mt-3 mb-4'>
            {/* payer_id */}
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Payer ID</FormControlLabelText>
              </FormControlLabel>
              {/* Payer */}
              <Input ref={inputRef}>
                <InputField
                  value={String(form?.payer)}
                  onChangeText={(v) => handleChange('payer', v)}
                  keyboardType='numeric'
                  placeholder='Enter Payer ID'
                />
              </Input>
              <FormControlLabel>
                <FormControlLabelText>Title</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  value={form?.title}
                  onChangeText={(v) => handleChange('title', v)}
                  placeholder='Expense title'
                  keyboardType='default'
                />
              </Input>

              <FormControlLabel>
                <FormControlLabelText>Amount</FormControlLabelText>
              </FormControlLabel>
              {/* Amount */}
              <Input>
                <InputField
                  value={String(form?.amount)}
                  onChangeText={(v) => handleChange('amount', v)}
                  keyboardType='numeric'
                  placeholder='Enter amount'
                />
              </Input>

              <FormControlLabel>
                <FormControlLabelText>Category ID</FormControlLabelText>
              </FormControlLabel>
              {/* Category ID */}
              <Select
                onPointerDown={() => {
                  Keyboard.dismiss();

                  console.log('close category 2');
                }}
                isRequired
                onClose={() => {
                  Keyboard.dismiss();

                  console.log('close category');
                }}
                onOpen={() => {
                  inputRef.current?.blur();
                  setTimeout(() => {}, 100);
                  Keyboard.dismiss();
                  console.log('fuk u');
                }}
                selectedValue={selectedCategory}
                onValueChange={handleSelectCategory}>
                <SelectTrigger
                  className='justify-between'
                  variant='outline'
                  size='md'>
                  <SelectInput className='py-0' placeholder='Select option' />
                  <SelectIcon className='mr-3' as={ChevronDownIcon} />
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
                    <Box className='mb-32'></Box>
                  </SelectContent>
                </SelectPortal>
              </Select>

              <FormControlLabel>
                <FormControlLabelText>Date</FormControlLabelText>
              </FormControlLabel>

              <Pressable
                onPress={() => {
                  Keyboard.dismiss(),
                    setTimeout(() => setShowDatePicker(true), 100);
                }}>
                <View style={styles.fakeInput}>
                  <Text style={styles.inputText}>
                    {formatDate(form!.date.toString()) || 'DD-MM-YYYY'}
                  </Text>
                </View>
              </Pressable>

              {showDatePicker && (
                <DateTimePicker
                  mode='date'
                  value={form?.date ? new Date(form.date) : new Date()}
                  display='default'
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const formatted = selectedDate.toISOString(); // YYYY-MM-DD
                      handleChange('date', formatted);
                    }
                  }}
                />
              )}

              {/*<FormControlLabel>
              <FormControlLabelText>Split Users (JSON)</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                multiline
                value={form.split_users}
                onChangeText={(v) => handleChange('split_users', v)}
                placeholder='e.g., [{"id":1,"amount":500}]'
              />
            </Input> */}
            </FormControl>
          </AlertDialogBody>
        </ScrollView>
        <AlertDialogFooter className=''>
          <Button
            variant='outline'
            action='secondary'
            onPress={closeDialog}
            size='sm'>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size='sm'
            onPress={() => {
              onSubmit();
            }}>
            <ButtonText>Add</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const styles = StyleSheet.create({
  fakeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
});
