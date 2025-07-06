import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useExpenseStore } from '@/app/store/useExpenseStore';
import { formatDate } from '@/app/utils/dateFormat';

const chartWidth = Dimensions.get('window').width - 32;
const timeRanges = ['Days', 'Weeks', 'Months'] as const;
type TimeRange = (typeof timeRanges)[number];

export const ExpenseChart = () => {
  useEffect(() => {
    useExpenseStore.getState().getChartExpenses();
  }, []);
  const screenWidth = Dimensions.get('window').width;
  const chartExpenses = useExpenseStore((s) => s.chartExpenses);
  const [range, setRange] = useState<TimeRange>('Days');

  const { labels, data } = useMemo(() => {
    const grouped: Record<string, number> = {};

    chartExpenses.forEach((exp) => {
      const date = new Date(exp.date);
      let label = '';

      switch (range) {
        case 'Days':
          label = formatDate(date.toString());
          break;
        case 'Weeks':
          const startOfWeek = new Date(date);
          startOfWeek.setDate(date.getDate() - date.getDay()); // Sunday
          label = startOfWeek.toISOString().split('T')[0];
          break;
        case 'Months':
          label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0',
          )}`;
          break;
      }

      grouped[label] = (grouped[label] || 0) + Number(exp.amount);
    });

    const sortedKeys = Object.keys(grouped).sort();

    return {
      labels: sortedKeys,
      data: sortedKeys.map((k) => grouped[k]),
    };
  }, [range, chartExpenses]);

  return (
    <View className='my-3 px-4'>
      {/* Time Range Tabs */}
      <View
        className='justify-between '
        style={{ flexDirection: 'row', marginBottom: 8 }}>
        {timeRanges.map((r) => (
          <TouchableOpacity
            className='w-1/3'
            key={r}
            onPress={() => setRange(r)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: r === range ? '#AD40AF' : '#eee',
              borderRadius: 8,
            }}>
            <Text
              className='text-center'
              style={{ color: r === range ? '#fff' : '#333' }}>
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {labels.length > 0 ? (
        <LineChart
          data={{
            labels,
            datasets: [{ data }],
          }}
          width={chartWidth} // full width
          height={220}
          formatXLabel={(label) => {
            // Limit label length or trim whitespace if needed
            if (label.length > 8) return label.slice(0, 8);
            return label;
          }}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withDots={true}
          withShadow={true}
          fromNumber={0}
          fromZero
          yLabelsOffset={0}
          withHorizontalLabels={false}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(173, 64, 175, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#AD40AF',
            },
            propsForBackgroundLines: {
              strokeDasharray: '', // removes dashed background grid
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            paddingRight: 0,
            paddingLeft: 0,
          }}
        />
      ) : (
        <Text className='text-center text-gray-500 mt-10'>
          No data available
        </Text>
      )}
    </View>
  );
};
