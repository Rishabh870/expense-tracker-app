import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Icon, MailIcon } from "@/components/ui/icon";
import * as TablerIcon from "@tabler/icons-react-native";
import { colors } from "@/app/constants/theme";
import { Categories } from "@/app/utils/types";
import { CategoryItem } from "@/app/types/category.types";

interface Props {
  title?: string;
  category: CategoryItem;
  description?: string;
  amount?: number;
  isBilled?: boolean;
}

export const CategoryCard = ({
  title,
  category,
  description,
  amount,
  isBilled,
}: Props) => {
  const DynamicIcon = TablerIcon[
    category.icon as keyof typeof TablerIcon
  ] as React.ComponentType<any>;

  isBilled =
    (category.budgets?.amount || 0) - (category.budgets?.spent || 0) < 0;
  const amountColor = isBilled ? "text-red-500" : "text-green-500";
  const desc = description ? description : category.description;

  return (
    <Card
      size="lg"
      variant="filled"
      style={{ backgroundColor: colors.cardbackground }}
      className=" my-2 px-3 py-3 rounded-2xl"
    >
      <HStack space="lg" className="text-center  justify-evenly">
        {/* Left: Icon */}
        <Box
          className="w-16 h-16 rounded-2xl items-center justify-center"
          style={{ backgroundColor: category.bgColor }}
        >
          <DynamicIcon size={28} color="#fff" />
        </Box>

        {/* Middle: Text Info */}
        <VStack className="flex-1 ml-3">
          <Heading size="lg" className="mb-1.5">
            {title ? title : category.name}
          </Heading>
          {desc && (
            <Text size="sm" className="text-muted-500 text-gray-500">
              {desc}
            </Text>
          )}
        </VStack>

        {category.budgets?.amount && (
          <Text size="lg" bold className={amountColor}>
            {isBilled ? "-" : "+"} ₹
            {Math.abs((category.budgets?.amount || 0) - (category.budgets?.spent || 0))}
          </Text>
        )}
      </HStack>
    </Card>
  );
};
