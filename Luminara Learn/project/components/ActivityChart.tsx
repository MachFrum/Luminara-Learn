import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { DailyActivity } from '@/types/progress';

interface ActivityChartProps {
  data: DailyActivity[];
  height?: number;
}

export default function ActivityChart({ data, height = 120 }: ActivityChartProps) {
  const animatedValues = useRef(
    data.map(() => new Animated.Value(0))
  ).current;

  const maxProblems = Math.max(...data.map(day => day.problems), 1);

  useEffect(() => {
    const animations = animatedValues.map((animValue, index) => 
      Animated.timing(animValue, {
        toValue: data[index].problems,
        duration: 800,
        delay: index * 100,
        useNativeDriver: false,
      })
    );

    Animated.stagger(50, animations).start();
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={[styles.chart, { height }]}>
        {data.map((day, index) => {
          const barHeight = animatedValues[index].interpolate({
            inputRange: [0, maxProblems],
            outputRange: [4, height - 40],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity key={day.date} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <Animated.View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: day.completed ? '#8A2BE2' : '#4A4A4A',
                    },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>
                {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
              </Text>
              <Text style={styles.problemCount}>{day.problems}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    height: '100%',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 16,
    borderRadius: 8,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  problemCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});