// components/common/AvatarFromName.tsx

import React from "react";
import { View, Text } from "react-native";
import { Box } from "@/components/ui/box";

interface AvatarFromNameProps {
  name: string;
  bgColor?: string;
  size?: number;
  textSize?: number;
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const mantineColorMap = [
  "blue",
  "cyan",
  "grape",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet",
  "yellow",
];

function hashCode(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

const defaultColors = [
  "blue",
  "cyan",
  "grape",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet",
];

export function getInitialsColor(name: string) {
  const hash = hashCode(name);
  const index = Math.abs(hash) % defaultColors.length;
  return defaultColors[index];
}

export const AvatarFromName = ({
  name,
  bgColor = "#3B82F6",
  size = 64,
  textSize = 24,
}: AvatarFromNameProps) => {
  const initials = getInitials(name);
  const dynamicBgColor = getInitialsColor(initials);
  console.log(dynamicBgColor);
  return (
    <Box
      className={`rounded items-center justify-center bg-${dynamicBgColor}-100`}
      style={{
        borderRadius: 12, // 👈 Equivalent to rounded-2xl
        padding: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Text
        className={`text-${dynamicBgColor}-500`}
        style={{
          fontWeight: "bold",
          fontSize: textSize,
        }}
      >
        {initials}
      </Text>
    </Box>
  );
};
