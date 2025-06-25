import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  inputType?: 'text' | 'password';
  keyboardType?: KeyboardTypeOptions;
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  inputType = 'text',
  keyboardType = 'default',
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
}) => {
  return (
    <View className='flex-row border-b border-b-[#ccc] pb-2 mb-6 items-center'>
      {icon}
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        secureTextEntry={inputType === 'password'}
        className='flex-1 py-0 text-base text-black'
        value={value}
        onChangeText={onChangeText}
      />
      {fieldButtonLabel && fieldButtonFunction && (
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text className='text-[#AD40AF] font-bold'>{fieldButtonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
