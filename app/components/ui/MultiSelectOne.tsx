import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  Checkbox,
  VStack,
  HStack,
} from "@gluestack-ui/themed";

export default function MultiSelectOne({ options }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showSheet, setShowSheet] = useState(false);

  const toggleItem = (val: string) => {
    if (selectedItems.includes(val)) {
      setSelectedItems(selectedItems.filter((item) => item !== val));
    } else {
      setSelectedItems([...selectedItems, val]);
    }
  };

  return (
    <Box>
      <Button onPress={() => setShowSheet(true)}>
        <Text>Select Categories</Text>
      </Button>

      <Text mt="$4" color="$gray600">
        Selected: {selectedItems.join(", ") || "None"}
      </Text>

      <Actionsheet isOpen={showSheet} onClose={() => setShowSheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <VStack space="md" p="$4">
            {options.map((opt) => (
              <HStack key={opt.value} alignItems="center" space="sm">
                <Checkbox
                  isChecked={selectedItems.includes(opt.value)}
                  onChange={() => toggleItem(opt.value)}
                  value={opt.value}
                >
                  <Text>{opt.label}</Text>
                </Checkbox>
              </HStack>
            ))}
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
