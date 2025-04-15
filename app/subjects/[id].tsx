import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function SubjectsScreen() {
  const { id, subjects } = useLocalSearchParams();
  const router = useRouter();
  const subjectsList = JSON.parse(subjects as string);

  const handleSubjectPress = (subject: string) => {
    router.push({
      pathname: '/research',
      params: { query: subject }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sujets disponibles</Text>
      <View style={styles.subjectsGrid}>
        {subjectsList.map((subject: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.subjectCard}
            onPress={() => handleSubjectPress(subject)}
          >
            <Text style={styles.subjectText}>{subject}</Text>
            <Text style={styles.subjectHint}>Appuyez pour rechercher</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  subjectsGrid: {
    gap: 12,
  },
  subjectCard: {
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
  subjectText: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 8,
  },
  subjectHint: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
});