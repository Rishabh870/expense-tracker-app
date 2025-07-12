// components/common/AvatarFromName.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { Box } from '@/components/ui/box';

interface AvatarFromNameProps {
  name: string;
  bgColor?: string;
  size?: number;
  textSize?: number;
}

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

// Hash a string to a consistent pastel-ish color
export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 70%)`; // pastel-like color
};

export const AvatarFromName = ({
  name,
  bgColor = '#3B82F6',
  size = 64,
  textSize = 24,
}: AvatarFromNameProps) => {
  const initials = getInitials(name);
  const dynamicBgColor = stringToColor(name) || bgColor;

  return (
    <Box
      className='rounded items-center justify-center'
      style={{
        backgroundColor: dynamicBgColor,
        borderRadius: 12, // 👈 Equivalent to rounded-2xl
        padding: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: textSize,
        }}>
        {initials}
      </Text>
    </Box>
  );
};
