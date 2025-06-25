import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='bg-[#AD40AF] p-5 rounded-xl mb-7'>
      <Text className='text-center font-bold text-base text-white'>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
