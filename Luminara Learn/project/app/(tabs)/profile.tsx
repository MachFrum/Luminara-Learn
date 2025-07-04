import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, Camera, Moon, Volume2, Monitor, Users, Crown, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", style: "destructive", onPress: () => console.log("Logged out") }
      ]
    );
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", onPress: () => {} },
        { icon: Camera, label: "Change Avatar", onPress: () => {} },
        { icon: Crown, label: "Upgrade to Premium", onPress: () => {}, premium: true },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", toggle: true, value: true },
        { icon: Volume2, label: "Sound Effects", toggle: true, value: true },
        { icon: Moon, label: "Dark Mode", toggle: true, value: false },
      ]
    },
    {
      title: "Family",
      items: [
        { icon: Users, label: "Parent Dashboard", onPress: () => {} },
        { icon: Shield, label: "Screen Time Controls", onPress: () => {} },
        { icon: Monitor, label: "Teacher Portal", onPress: () => {} },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", onPress: () => {} },
        { icon: Settings, label: "App Settings", onPress: () => {} },
        { icon: LogOut, label: "Sign Out", onPress: handleLogout, danger: true },
      ]
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>PM</Text>
            </View>
            <View style={styles.statusIndicator} />
          </View>
          <Text style={styles.userName}>Peter Macharia</Text>
          <Text style={styles.userEmail}>peter.macharia@email.com</Text>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Level 12 • Learning Explorer</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Problems Solved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Hours Learned</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupContainer}>
              {group.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingsItem,
                    itemIndex === group.items.length - 1 && styles.lastItem
                  ]}
                  onPress={item.onPress}
                  disabled={item.toggle}
                >
                  <View style={styles.settingsItemLeft}>
                    <View style={[
                      styles.settingsIcon,
                      item.danger && styles.dangerIcon,
                      item.premium && styles.premiumIcon
                    ]}>
                      <item.icon 
                        size={20} 
                        color={item.danger ? "#EF4444" : item.premium ? "#F59E0B" : "#6B7280"} 
                      />
                    </View>
                    <Text style={[
                      styles.settingsLabel,
                      item.danger && styles.dangerLabel,
                      item.premium && styles.premiumLabel
                    ]}>
                      {item.label}
                    </Text>
                  </View>
                  
                  {item.toggle ? (
                    <Switch
                      value={item.value}
                      onValueChange={() => {}}
                      trackColor={{ false: '#D1D5DB', true: '#6366F1' }}
                      thumbColor={item.value ? '#FFF' : '#FFF'}
                    />
                  ) : (
                    <ChevronRight size={16} color="#D1D5DB" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footerSection}>
          <Text style={styles.footerText}>Luminara Learn v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            Illuminating the path to understanding
          </Text>
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 12,
  },
  levelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    padding: 20,
  },
  settingsGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    marginLeft: 4,
  },
  groupContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dangerIcon: {
    backgroundColor: '#FEF2F2',
  },
  premiumIcon: {
    backgroundColor: '#FEF3C7',
  },
  settingsLabel: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  dangerLabel: {
    color: '#EF4444',
  },
  premiumLabel: {
    color: '#F59E0B',
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});