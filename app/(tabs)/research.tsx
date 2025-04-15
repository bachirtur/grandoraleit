import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Search } from 'lucide-react-native';
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('YOUR_API_KEY');

export default function ResearchScreen() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState('');

  const searchWithGemini = async () => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Aide-moi à préparer mon Grand Oral sur le sujet suivant: ${query}. 
                     Donne-moi des pistes de réflexion, des sources potentielles et des angles d'approche.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResults(response.text());
    } catch (error) {
      console.error('Erreur:', error);
      setResults('Une erreur est survenue lors de la recherche.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#64748b" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher des ressources..."
          placeholderTextColor="#94a3b8"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchWithGemini}
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={searchWithGemini}
          disabled={isLoading}
        >
          <Text style={styles.searchButtonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Recherche en cours...</Text>
          </View>
        ) : (
          <>
            {results ? (
              <View style={styles.resultsContainer}>
                <Text style={styles.resultsText}>{results}</Text>
              </View>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Ressources recommandées</Text>
                <View style={styles.resourceCard}>
                  <Text style={styles.resourceTitle}>Comment structurer votre présentation</Text>
                  <Text style={styles.resourceDescription}>
                    Guide pratique pour organiser vos idées et créer un plan efficace pour votre Grand Oral.
                  </Text>
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    margin: 16,
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
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  searchButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  resultsContainer: {
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
  resultsText: {
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  resourceCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#64748b',
  },
});