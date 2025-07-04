import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Platform,
  Dimensions
} from 'react-native';
import { useState, useRef } from 'react';
import { Camera as CameraIcon, RotateCcw, Zap, Image as ImageIcon, CircleHelp as HelpCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { 
  CameraViewComponent, 
  CameraTypeEnum, 
  FlashModeEnum, 
  useCameraPermissionsHook, 
  HapticsModule,
  isCameraAvailable 
} from '@/utils/camera';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const [facing, setFacing] = useState<string>(CameraTypeEnum?.back || 'back');
  const [permission, requestPermission] = useCameraPermissionsHook();
  const [isCapturing, setIsCapturing] = useState(false);
  const [flashMode, setFlashMode] = useState<string>(FlashModeEnum?.off || 'off');
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef<any>(null);
  const router = useRouter();

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.permissionGradient}
        >
          <CameraIcon size={64} color="#FFF" />
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>
            To help you learn, we need access to your camera to capture problems and concepts.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    
    // Trigger haptic feedback if available
    if (Platform.OS !== 'web' && HapticsModule?.selectionAsync) {
      try {
        HapticsModule.selectionAsync();
      } catch (error) {
        console.warn('Haptics not available:', error);
      }
    }
  };

  const toggleFlash = () => {
    const modes = [FlashModeEnum?.off || 'off', FlashModeEnum?.on || 'on', FlashModeEnum?.auto || 'auto'];
    const currentIndex = modes.indexOf(flashMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setFlashMode(modes[nextIndex]);
  };

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      try {
        setIsCapturing(true);
        
        // Trigger haptic feedback if available
        if (Platform.OS !== 'web' && HapticsModule?.impactAsync) {
          try {
            HapticsModule.impactAsync();
          } catch (error) {
            console.warn('Haptics not available:', error);
          }
        }
        
        if (Platform.OS === 'web' || !isCameraAvailable()) {
          // For web platform or when camera is not available, simulate the capture process
          setTimeout(() => {
            setIsCapturing(false);
            router.push('/learn');
          }, 1000);
        } else {
          // For native platforms with camera available
          if (cameraRef.current?.takePictureAsync) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log('Photo captured:', photo);
          }
          setIsCapturing(false);
          router.push('/learn');
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        setIsCapturing(false);
        Alert.alert('Error', 'Failed to capture image. Please try again.');
      }
    }
  };

  const openGallery = () => {
    Alert.alert(
      'Select Image',
      'Choose an image from your gallery to start learning.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Gallery', onPress: () => router.push('/learn') }
      ]
    );
  };

  const handleZoom = (newZoom: number) => {
    const clampedZoom = Math.max(0, Math.min(1, newZoom));
    setZoom(clampedZoom);
  };

  const cameraProps: any = {
    style: styles.camera,
    facing,
    ref: cameraRef
  };

  // Only add flash and zoom props if camera is available
  if (isCameraAvailable()) {
    if (FlashModeEnum && flashMode) {
      cameraProps.flash = flashMode;
    }
    if (zoom !== undefined) {
      cameraProps.zoom = zoom;
    }
  }

  return (
    <View style={styles.container}>
      <CameraViewComponent {...cameraProps}>
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
          style={styles.topOverlay}
        >
          <Text style={styles.instructionText}>
            Point your camera at any problem or concept
          </Text>
        </LinearGradient>

        <View style={styles.centerOverlay}>
          <View style={styles.focusFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>

        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.bottomOverlay}
        >
          <View style={styles.helpContainer}>
            <HelpCircle size={20} color="#FFF" />
            <Text style={styles.helpText}>
              We'll guide you through understanding, step by step
            </Text>
          </View>

          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={openGallery}
            >
              <ImageIcon size={24} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.captureButton, isCapturing && styles.captureButtonActive]}
              onPress={takePicture}
              disabled={isCapturing}
            >
              <View style={styles.captureButtonInner}>
                {isCapturing ? (
                  <Zap size={32} color="#FFF" />
                ) : (
                  <CameraIcon size={32} color="#FFF" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleCameraFacing}
            >
              <RotateCcw size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </CameraViewComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    fontSize: 18,
    color: '#6B7280',
  },
  permissionContainer: {
    flex: 1,
  },
  permissionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 24,
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  instructionText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  centerOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -100 }],
  },
  focusFrame: {
    width: 300,
    height: 200,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#FFF',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  helpText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 8,
    textAlign: 'center',
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
  },
  captureButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  captureButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});