// utils/useBreakpoint.ts
import { useWindowDimensions } from 'react-native';

export const breakpoints = {
  sm: 0,
  md: 375, // iPhone 12, 13 mini
  lg: 768, // tablets
  xl: 1024, // landscape tablets or foldables
};

export type Breakpoint = keyof typeof breakpoints;

export const useBreakpoint = (): Breakpoint => {
  const { width } = useWindowDimensions();
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  return 'sm';
};
