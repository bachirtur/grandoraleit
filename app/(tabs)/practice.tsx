import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Video } from 'lucide-react-native';
import { CameraView } from 'expo-camera';
import { useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PracticeScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const cameraRef = useRef(null);

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const { uri } = await cameraRef.current.recordAsync();
      
      // Sauvegarder l'enregistrement dans la galerie
      const asset = await MediaLibrary.createAssetAsync(uri);
      
      // Sauvegarder la référence dans AsyncStorage
      const newRecordings = [...recordings, { uri: asset.uri, date: new Date() }];
      setRecordings(newRecordings);
      await AsyncStorage.setItem('recordings', JSON.stringify(newRecordings));
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing="front"
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Entraînement</Text>
          <Text style={styles.subtitle}>
            Enregistrez-vous pour analyser votre présentation
          </Text>
          
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.recordButton, isRecording && styles.recording]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <Video size={32} color="#ffffff" />
              ) : (
                <Camera size={32} color="#ffffff" />
              )}
            </TouchableOpacity>
          </View>

          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Enregistrement en cours...</Text>
            </View>
          )}
        </View>
      </CameraView>

      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackTitle}>Analyse de la présentation</Text>
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackLabel}>Rythme de parole</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
        </View>

        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackLabel}>Contact visuel</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
        </View>

        <View style={styles.recordingsSection}>
          <Text style={styles.recordingsTitle}>Mes enregistrements</Text>
          {recordings.map((recording, index) => (
            <TouchableOpacity key={index} style={styles.recordingItem}>
              <Text style={styles.recordingDate}>
                {new Date(recording.date).toLocaleDateString()}
              </Text>
              <Text style={styles.recordingDuration}>5:30</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  camera: {
    flex: 1,
    maxHeight: '60%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 8,
  },
  controls: {
    alignItems: 'center',
    marginBottom: 24,
  },
  recordButton: {
    backgroundColor: '#ef4444',
    padding: 24,
    borderRadius: 999,
  },
  recording: {
    backgroundColor: '#dc2626',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  recordingDot: {
    width: 12,
    height: 12,
    backgroundColor: '#ef4444',
    borderRadius: 999,
  },
  recordingText: {
    color: '#ffffff',
    fontSize: 16,
  },
  feedbackSection: {
    padding: 24,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  feedbackCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  feedbackLabel: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  recordingsSection: {
    marginTop: 24,
  },
  recordingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  recordingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  recordingDate: {
    fontSize: 16,
    color: '#1e293b',
  },
  recordingDuration: {
    fontSize: 16,
    color: '#64748b',
  },
});