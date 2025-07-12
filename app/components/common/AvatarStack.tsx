import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import React from 'react';
import { View, Text } from 'react-native';
import { AvatarFromName } from '../ui/Avatar';

type Person = {
  id: number;
  name: string;
};

interface AvatarStackProps {
  people: Person[];
  limit?: number;
  size?: number;
  textSize?: number;
  overlap?: number;
}

const AvatarStack = ({
  people,
  limit = 3,
  size = 20,
  textSize = 8,
  overlap = 12,
}: AvatarStackProps) => {
  const visible = people.slice(0, limit - 1);
  const remaining = people.length - visible.length;
  const stackWidth = visible.length * overlap + size; // total width including last avatar

  return (
    <View
      style={{
        height: size,
        width: stackWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{ height: size, width: stackWidth, position: 'relative' }}>
        {visible.map((person, index) => (
          <Box
            key={index}
            style={{
              position: 'absolute',
              left: index * overlap,
              zIndex: people.length - index,
            }}>
            <AvatarFromName
              name={person.name}
              size={size}
              textSize={textSize}
            />
          </Box>
        ))}

        {remaining > 0 && (
          <Box
            style={{
              position: 'absolute',
              left: (limit - 1) * overlap,
              zIndex: 0,
              backgroundColor: '#D1D5DB',
              borderRadius: 100,
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: textSize,
                fontWeight: 'bold',
                color: '#374151',
              }}>
              +{remaining}
            </Text>
          </Box>
        )}
      </View>
    </View>
  );
};

export default AvatarStack;
