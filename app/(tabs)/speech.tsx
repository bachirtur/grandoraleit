import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Play, Pause, RotateCcw } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SpeechScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [speech, setSpeech] = useState('');

  useEffect(() => {
    loadSpeech();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const loadSpeech = async () => {
    try {
      const savedSpeech = await AsyncStorage.getItem('speech');
      if (savedSpeech) {
        setSpeech(savedSpeech);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.timerSection}>
        <View style={styles.timerCard}>
          <Text style={styles.timer}>{formatTime(time)}</Text>
          <View style={styles.controls}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={toggleTimer}
            >
              {isRunning ? (
                <Pause size={24} color="#ffffff" />
              ) : (
                <Play size={24} color="#ffffff" />
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.controlButton, styles.resetButton]}
              onPress={resetTimer}
            >
              <RotateCcw size={24} color="#64748b" />
            </TouchableOpacity>
          </View>
          <Text style={styles.timerHint}>
            {time < 300 ? "Continuez, vous avez encore du temps" : 
             time < 360 ? "Plus que 1 minute !" : 
             "Il est temps de conclure"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Votre discours</Text>
        <View style={styles.speechCard}>
          <Text style={styles.speechText}>
            {speech || "Bonjour, je vais vous présenter mon sujet qui porte sur..."}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conseils pour l'oral</Text>
        <View style={styles.tipsGrid}>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Rythme</Text>
            <Text style={styles.tipText}>
              • Parlez lentement et clairement{'\n'}
              • Faites des pauses régulières{'\n'}
              • Respirez profondément{'\n'}
              • Articulez bien
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Posture</Text>
            <Text style={styles.tipText}>
              • Tenez-vous droit{'\n'}
              • Gardez un contact visuel{'\n'}
              • Évitez les gestes parasites{'\n'}
              • Souriez naturellement
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Structure</Text>
            <Text style={styles.tipText}>
              • Introduction claire{'\n'}
              • Transitions fluides{'\n'}
              • Arguments organisés{'\n'}
              • Conclusion impactante
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  timerSection: {
    backgroundColor: '#6366f1',
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  timerCard: {
    alignItems: 'center',
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
  },
  resetButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  timerHint: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  speechCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  speechText: {
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 24,
  },
  tipsGrid: {
    gap: 16,
  },
  tipCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
});