import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Plus, Save, Trash2 } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Axis {
  id: string;
  title: string;
  content: string;
}

export default function OutlineScreen() {
  const [problematic, setProblematic] = useState('');
  const [axes, setAxes] = useState<Axis[]>([
    { id: '1', title: 'Axe 1', content: '' },
    { id: '2', title: 'Axe 2', content: '' }
  ]);
  const [conclusion, setConclusion] = useState('');

  useEffect(() => {
    loadOutline();
  }, []);

  const loadOutline = async () => {
    try {
      const savedOutline = await AsyncStorage.getItem('outline');
      if (savedOutline) {
        const { problematic, axes, conclusion } = JSON.parse(savedOutline);
        setProblematic(problematic);
        setAxes(axes);
        setConclusion(conclusion);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    }
  };

  const saveOutline = async () => {
    try {
      const outline = { problematic, axes, conclusion };
      await AsyncStorage.setItem('outline', JSON.stringify(outline));
      alert('Plan sauvegardé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const addAxis = () => {
    const newId = (axes.length + 1).toString();
    setAxes([...axes, { id: newId, title: `Axe ${newId}`, content: '' }]);
  };

  const removeAxis = (id: string) => {
    setAxes(axes.filter(axis => axis.id !== id));
  };

  const updateAxisContent = (id: string, content: string) => {
    setAxes(axes.map(axis => 
      axis.id === id ? { ...axis, content } : axis
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Plan</Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveOutline}>
          <Save size={20} color="#ffffff" />
          <Text style={styles.saveButtonText}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Problématique</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Entrez votre problématique..."
          placeholderTextColor="#94a3b8"
          value={problematic}
          onChangeText={setProblematic}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Axes principaux</Text>
        
        {axes.map((axis) => (
          <View key={axis.id} style={styles.axisCard}>
            <View style={styles.axisTitleContainer}>
              <Text style={styles.axisTitle}>{axis.title}</Text>
              {axes.length > 2 && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeAxis(axis.id)}
                >
                  <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              style={styles.input}
              multiline
              placeholder={`Décrivez votre ${axis.title.toLowerCase()}...`}
              placeholderTextColor="#94a3b8"
              value={axis.content}
              onChangeText={(content) => updateAxisContent(axis.id, content)}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addAxis}>
          <Plus size={24} color="#ffffff" />
          <Text style={styles.addButtonText}>Ajouter un axe</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conclusion</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Rédigez votre conclusion..."
          placeholderTextColor="#94a3b8"
          value={conclusion}
          onChangeText={setConclusion}
        />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#1e293b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  axisCard: {
    marginBottom: 16,
  },
  axisTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  axisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  removeButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});