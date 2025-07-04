import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, X, Star, Lightbulb, ArrowRight, CircleCheck as CheckCircle, MessageCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LearnScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const learningSteps = [
    {
      id: 1,
      title: "Let's Break This Down",
      content: "I see you're working on a quadratic equation! Let's start by identifying the key components.",
      hint: "Look for the coefficients a, b, and c in ax² + bx + c = 0",
      fact: "Did you know? The quadratic formula was known to mathematicians over 4,000 years ago!"
    },
    {
      id: 2,
      title: "Identify the Pattern",
      content: "Great! Now let's look at the structure. What do you notice about the highest power of x?",
      hint: "The highest power tells us this is a quadratic equation",
      fact: "The word 'quadratic' comes from the Latin 'quadratus' meaning 'square'!"
    },
    {
      id: 3,
      title: "Apply the Method",
      content: "Perfect! Now we can use the quadratic formula. Can you identify what a, b, and c are?",
      hint: "In 2x² + 5x - 3 = 0, a = 2, b = 5, c = -3",
      fact: "The discriminant (b² - 4ac) tells us how many real solutions we have!"
    },
    {
      id: 4,
      title: "Solve Step by Step",
      content: "Excellent work! Let's substitute these values into the quadratic formula.",
      hint: "x = (-b ± √(b² - 4ac)) / 2a",
      fact: "Some quadratic equations have two solutions, some have one, and some have none!"
    },
    {
      id: 5,
      title: "Check Your Understanding",
      content: "You've got it! The solutions are x = 1/2 and x = -3. How does this make you feel?",
      hint: "You can always check by substituting back into the original equation",
      fact: "Congratulations! You've just solved a problem that challenged mathematicians for centuries!"
    }
  ];

  const currentStepData = learningSteps[currentStep];

  const handleNext = () => {
    if (currentStep < learningSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowRating(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRating = (stars: number) => {
    setRating(stars);
    setTimeout(() => {
      setShowRating(false);
      setCurrentStep(0);
      setRating(0);
    }, 1500);
  };

  if (showRating) {
    return (
      <View style={styles.ratingContainer}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.ratingGradient}
        >
          <CheckCircle size={64} color="#FFF" />
          <Text style={styles.ratingTitle}>Great Job!</Text>
          <Text style={styles.ratingText}>How did this learning experience feel?</Text>
          
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star)}
                style={styles.starButton}
              >
                <Star 
                  size={32} 
                  color={star <= rating ? "#FCD34D" : "#FFF"} 
                  fill={star <= rating ? "#FCD34D" : "none"}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          {rating > 0 && (
            <Text style={styles.thankYouText}>
              Thank you for your feedback! 🎉
            </Text>
          )}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Guided Discovery</Text>
          <Text style={styles.headerSubtitle}>
            Step {currentStep + 1} of {learningSteps.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / learningSteps.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          <Text style={styles.stepContent}>{currentStepData.content}</Text>
          
          <View style={styles.hintContainer}>
            <Lightbulb size={20} color="#F59E0B" />
            <Text style={styles.hintText}>{currentStepData.hint}</Text>
          </View>

          <View style={styles.factContainer}>
            <MessageCircle size={20} color="#6366F1" />
            <Text style={styles.factText}>{currentStepData.fact}</Text>
          </View>
        </View>

        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}>Working Example</Text>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleText}>2x² + 5x - 3 = 0</Text>
            <View style={styles.exampleSteps}>
              <Text style={styles.exampleStep}>a = 2, b = 5, c = -3</Text>
              <Text style={styles.exampleStep}>x = (-5 ± √(25 + 24)) / 4</Text>
              <Text style={styles.exampleStep}>x = (-5 ± √49) / 4</Text>
              <Text style={styles.exampleStep}>x = (-5 ± 7) / 4</Text>
              <Text style={styles.exampleResult}>x = 1/2 or x = -3</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]}
          onPress={handleBack}
          disabled={currentStep === 0}
        >
          <ChevronLeft size={24} color={currentStep === 0 ? "#D1D5DB" : "#6366F1"} />
          <Text style={[styles.navText, currentStep === 0 && styles.navTextDisabled]}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === learningSteps.length - 1 ? "Complete" : "Next"}
          </Text>
          <ArrowRight size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  stepContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 14,
    color: '#92400E',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  factContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 12,
  },
  factText: {
    fontSize: 14,
    color: '#3730A3',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  exampleContainer: {
    marginBottom: 100,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  exampleCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6366F1',
    textAlign: 'center',
    marginBottom: 16,
  },
  exampleSteps: {
    alignItems: 'center',
  },
  exampleStep: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  exampleResult: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginTop: 8,
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navText: {
    fontSize: 16,
    color: '#6366F1',
    marginLeft: 8,
    fontWeight: '600',
  },
  navTextDisabled: {
    color: '#D1D5DB',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  ratingContainer: {
    flex: 1,
  },
  ratingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  ratingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 24,
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 18,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 40,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  starButton: {
    padding: 8,
  },
  thankYouText: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 24,
    textAlign: 'center',
  },
});