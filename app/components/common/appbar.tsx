// Same logic but with StyleSheet
import { metrics } from '@/app/constants/metrics';
import { colors } from '@/app/constants/theme';
import { useBreakpoint } from '@/app/utils/useBreakpoint';
import { Box } from '@/components/ui/box';
import { View, Text, StyleSheet } from 'react-native';

export const AppBar = ({ routeName }: any) => {
  const bp = useBreakpoint();

  return (
    <Box
      style={[
        styles.header,
        {
          height: metrics.appBarHeight[bp],
        },
      ]}>
      <Text style={styles.text}>{routeName}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  header: {
    // height: 80,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: colors.background,
    fontWeight: 'bold',
  },
});
