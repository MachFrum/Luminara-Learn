import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Camera, 
  BookOpen, 
  Trophy, 
  Lightbulb,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const recentTopics = [
    { id: 1, title: 'Algebra Basics', progress: 85, color: '#6366F1' },
    { id: 2, title: 'History of Rome', progress: 65, color: '#8B5CF6' },
    { id: 3, title: 'Chemistry Bonds', progress: 45, color: '#EC4899' },
  ];

  const quickActions = [
    { id: 1, title: 'Capture Problem', icon: Camera, route: '/camera', color: '#6366F1' },
    { id: 2, title: 'Browse Topics', icon: BookOpen, route: '/learn', color: '#8B5CF6' },
    { id: 3, title: 'Daily Challenge', icon: Trophy, route: '/learn', color: '#EC4899' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6', '#EC4899']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good morning, Peter!</Text>
          <Text style={styles.subtitle}>Ready to discover something amazing?</Text>
          <View style={styles.streakContainer}>
            <Sparkles size={20} color="#FFF" />
            <Text style={styles.streakText}>7 day learning streak!</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Quick Actions Section - Horizontal Row */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => router.push(action.route as any)}
              >
                <LinearGradient
                  colors={[action.color, action.color + '80']}
                  style={styles.quickActionGradient}
                >
                  <action.icon size={24} color="#FFF" />
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Inspiration Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Inspiration</Text>
          <View style={styles.inspirationCard}>
            <LinearGradient
              colors={['#F3F4F6', '#E5E7EB']}
              style={styles.inspirationGradient}
            >
              <Lightbulb size={24} color="#6366F1" />
              <Text style={styles.inspirationText}>
                "The best way to learn is to teach someone else what you've discovered."
              </Text>
              <Text style={styles.inspirationAuthor}>- Luminara Learn</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Continue Learning Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity onPress={() => router.push('/learn')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentTopics.map((topic) => (
            <TouchableOpacity key={topic.id} style={styles.topicCard}>
              <View style={styles.topicInfo}>
                <View style={[styles.topicIcon, { backgroundColor: topic.color + '20' }]}>
                  <BookOpen size={20} color={topic.color} />
                </View>
                <View style={styles.topicDetails}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicProgress}>{topic.progress}% Complete</Text>
                </View>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${topic.progress}%`, backgroundColor: topic.color }
                    ]} 
                  />
                </View>
                <ArrowRight size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementGrid}>
            <View style={styles.achievementCard}>
              <Star size={20} color="#FCD34D" />
              <Text style={styles.achievementText}>Problem Solver</Text>
              <Text style={styles.achievementDesc}>25 problems solved</Text>
            </View>
            <View style={styles.achievementCard}>
              <Trophy size={20} color="#F59E0B" />
              <Text style={styles.achievementText}>Streak Master</Text>
              <Text style={styles.achievementDesc}>7 days in a row</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakText: {
    color: '#FFF',
    marginLeft: 8,
    fontWeight: '600',
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
    color: '#1F2937',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#6366F1',
    fontWeight: '600',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  quickActionText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  topicCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  topicIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicDetails: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  topicProgress: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  inspirationCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  inspirationGradient: {
    padding: 20,
    alignItems: 'center',
  },
  inspirationText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#374151',
    marginVertical: 12,
    lineHeight: 24,
  },
  inspirationAuthor: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  achievementGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});