import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  RefreshControl,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Calendar, Award, Target, Book, Clock, Star, Flame, Trophy, ChevronRight, ChartBar as BarChart3, Users, Zap } from 'lucide-react-native';

import AnimatedCounter from '@/components/AnimatedCounter';
import ProgressRing from '@/components/ProgressRing';
import ActivityChart from '@/components/ActivityChart';
import AchievementBadge from '@/components/AchievementBadge';
import { ProgressScreenData } from '@/types/progress';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Mock data - in a real app, this would come from an API
  const progressData: ProgressScreenData = {
    stats: {
      problemsSolved: 127,
      hoursLearned: 42,
      dayStreak: 7,
      totalPoints: 2840,
      level: 12,
      rank: 'Learning Explorer',
    },
    activities: [
      { date: '2024-01-15', problems: 5, minutes: 45, completed: true },
      { date: '2024-01-16', problems: 3, minutes: 30, completed: true },
      { date: '2024-01-17', problems: 7, minutes: 60, completed: true },
      { date: '2024-01-18', problems: 4, minutes: 35, completed: true },
      { date: '2024-01-19', problems: 6, minutes: 50, completed: true },
      { date: '2024-01-20', problems: 2, minutes: 20, completed: true },
      { date: '2024-01-21', problems: 8, minutes: 70, completed: true },
    ],
    subjects: [
      {
        id: '1',
        name: 'Mathematics',
        progress: 85,
        color: '#8A2BE2',
        problems: 47,
        totalProblems: 60,
        icon: 'calculator',
        lastActivity: '2 hours ago',
      },
      {
        id: '2',
        name: 'Science',
        progress: 70,
        color: '#4B0082',
        problems: 32,
        totalProblems: 45,
        icon: 'atom',
        lastActivity: '1 day ago',
      },
      {
        id: '3',
        name: 'History',
        progress: 60,
        color: '#6A0DAD',
        problems: 28,
        totalProblems: 50,
        icon: 'scroll',
        lastActivity: '3 hours ago',
      },
      {
        id: '4',
        name: 'English',
        progress: 75,
        color: '#9932CC',
        problems: 35,
        totalProblems: 40,
        icon: 'book',
        lastActivity: '5 hours ago',
      },
    ],
    achievements: [
      {
        id: '1',
        title: 'Problem Solver',
        description: 'Solved 50 problems',
        icon: 'target',
        color: '#8A2BE2',
        unlockedAt: '2024-01-20',
        rarity: 'epic',
        progress: 50,
        maxProgress: 50,
      },
      {
        id: '2',
        title: 'Streak Master',
        description: '7 days in a row',
        icon: 'flame',
        color: '#FF6B35',
        unlockedAt: '2024-01-21',
        rarity: 'legendary',
      },
      {
        id: '3',
        title: 'Quick Learner',
        description: 'Completed 5 topics',
        icon: 'star',
        color: '#FFD700',
        unlockedAt: '2024-01-19',
        rarity: 'rare',
      },
      {
        id: '4',
        title: 'Dedicated Student',
        description: '20 hours learned',
        icon: 'trophy',
        color: '#32CD32',
        unlockedAt: '2024-01-18',
        rarity: 'common',
        progress: 42,
        maxProgress: 50,
      },
    ],
    goals: [
      {
        id: '1',
        title: 'Weekly Challenge',
        description: 'Solve 50 problems this week',
        progress: 35,
        target: 50,
        deadline: '2024-01-28',
        type: 'weekly',
        icon: 'target',
        color: '#8A2BE2',
      },
      {
        id: '2',
        title: 'Study Marathon',
        description: 'Study for 10 hours this week',
        progress: 7.5,
        target: 10,
        deadline: '2024-01-28',
        type: 'weekly',
        icon: 'clock',
        color: '#4B0082',
      },
    ],
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const triggerHapticFeedback = () => {
    if (Platform.OS !== 'web') {
      // Haptic feedback would be implemented here for native platforms
    }
  };

  const StatCard = ({ icon: Icon, label, value, suffix = '', color = '#8A2BE2' }: any) => (
    <TouchableOpacity
      style={styles.statCard}
      onPress={triggerHapticFeedback}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[color + '20', color + '10']}
        style={styles.statGradient}
      >
        <View style={[styles.statIcon, { backgroundColor: color + '30' }]}>
          <Icon size={20} color={color} />
        </View>
        <AnimatedCounter
          value={value}
          suffix={suffix}
          style={[styles.statValue, { color }]}
          duration={1200}
        />
        <Text style={styles.statLabel}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const SubjectCard = ({ subject }: any) => (
    <TouchableOpacity style={styles.subjectCard} activeOpacity={0.8}>
      <View style={styles.subjectLeft}>
        <ProgressRing
          size={60}
          strokeWidth={6}
          progress={subject.progress}
          color={subject.color}
        >
          <Text style={styles.progressPercentage}>{subject.progress}%</Text>
        </ProgressRing>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={styles.subjectStats}>
            {subject.problems}/{subject.totalProblems} problems
          </Text>
          <Text style={styles.subjectActivity}>Last: {subject.lastActivity}</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#8A2BE2"
          colors={['#8A2BE2']}
        />
      }
    >
      {/* Header */}
      <LinearGradient colors={['#8A2BE2', '#4B0082']} style={styles.header}>
        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Your Progress</Text>
              <Text style={styles.headerSubtitle}>
                Level {progressData.stats.level} • {progressData.stats.rank}
              </Text>
            </View>
            <View style={styles.pointsBadge}>
              <Zap size={16} color="#FFD700" />
              <Text style={styles.pointsText}>{progressData.stats.totalPoints}</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              icon={Target}
              label="Problems"
              value={progressData.stats.problemsSolved}
              color="#8A2BE2"
            />
            <StatCard
              icon={Clock}
              label="Hours"
              value={progressData.stats.hoursLearned}
              color="#4B0082"
            />
            <StatCard
              icon={Flame}
              label="Streak"
              value={progressData.stats.dayStreak}
              suffix=" days"
              color="#FF6B35"
            />
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Activity Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activity Overview</Text>
            <View style={styles.periodToggle}>
              <TouchableOpacity
                style={[
                  styles.periodButton,
                  selectedPeriod === 'week' && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod('week')}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === 'week' && styles.periodButtonTextActive,
                  ]}
                >
                  Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.periodButton,
                  selectedPeriod === 'month' && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod('month')}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === 'month' && styles.periodButtonTextActive,
                  ]}
                >
                  Month
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ActivityChart data={progressData.activities} />
        </Animated.View>

        {/* Subjects Progress */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Subject Progress</Text>
          {progressData.subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </Animated.View>

        {/* Achievements */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.achievementsGrid}>
            {progressData.achievements.map((achievement, index) => (
              <View key={achievement.id} style={styles.achievementWrapper}>
                <AchievementBadge
                  achievement={achievement}
                  index={index}
                  onPress={triggerHapticFeedback}
                />
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Goals */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Current Goals</Text>
          {progressData.goals.map((goal) => (
            <TouchableOpacity key={goal.id} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <View style={[styles.goalIcon, { backgroundColor: goal.color + '20' }]}>
                  <Target size={20} color={goal.color} />
                </View>
                <View style={styles.goalInfo}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                </View>
                <Text style={styles.goalProgress}>
                  {Math.round((goal.progress / goal.target) * 100)}%
                </Text>
              </View>
              <View style={styles.goalProgressContainer}>
                <View style={styles.goalProgressBar}>
                  <View
                    style={[
                      styles.goalProgressFill,
                      {
                        width: `${(goal.progress / goal.target) * 100}%`,
                        backgroundColor: goal.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.goalProgressText}>
                  {goal.progress}/{goal.target}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Insights */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Learning Insights</Text>
          <View style={styles.insightCard}>
            <LinearGradient
              colors={['#282828', '#1A1A1A']}
              style={styles.insightGradient}
            >
              <TrendingUp size={24} color="#8A2BE2" />
              <Text style={styles.insightTitle}>You're on Fire! 🔥</Text>
              <Text style={styles.insightText}>
                Your problem-solving speed has improved by 40% this week.
                Keep challenging yourself with harder problems!
              </Text>
            </LinearGradient>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  seeAllText: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  periodToggle: {
    flexDirection: 'row',
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#8A2BE2',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#AAAAAA',
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  subjectCard: {
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subjectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  subjectInfo: {
    marginLeft: 16,
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subjectStats: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 2,
  },
  subjectActivity: {
    fontSize: 12,
    color: '#666666',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementWrapper: {
    width: (width - 60) / 2,
  },
  goalCard: {
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  goalProgress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8A2BE2',
  },
  goalProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#3A3A3A',
    borderRadius: 3,
    marginRight: 12,
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalProgressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 40,
  },
  insightCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  insightGradient: {
    padding: 20,
    alignItems: 'center',
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 20,
  },
});