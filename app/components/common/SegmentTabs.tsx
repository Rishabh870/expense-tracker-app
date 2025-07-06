// components/ui/SegmentTabs.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface TabOption {
  key: string;
  label: string;
}

interface SegmentTabsProps {
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const SegmentTabs: React.FC<SegmentTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <View className='flex-row w-full px-4 pt-4 pb-2 space-x-3'>
      {tabs.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          onPress={() => onTabChange(key)}
          className={`w-[47%] mx-auto h-10 justify-center px-4 py-2 rounded-lg ${
            activeTab === key ? 'bg-[#AD40AF]' : 'bg-gray-200'
          }`}>
          <Text
            className={`text-sm text-center font-semibold ${
              activeTab === key ? 'text-white' : 'text-gray-700'
            }`}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SegmentTabs;
