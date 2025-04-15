import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const SPECIALTIES = [
  { 
    id: 'maths', 
    name: 'Mathématiques',
    color: '#818cf8',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2940&auto=format&fit=crop',
    subjects: [
      "Les nombres premiers sont-ils infinis ?",
      "Peut-on modéliser le hasard en mathématiques ?",
      "Comment les statistiques permettent-elles de prédire les tendances électorales ?",
      "Quel est l'impact des mathématiques sur l'intelligence artificielle ?",
      "La cryptographie moderne est-elle inviolable ?",
      "Comment les probabilités sont-elles utilisées dans les assurances ?",
      "Pourquoi la suite de Fibonacci est-elle omniprésente dans la nature ?",
      "Comment les équations différentielles modélisent-elles les phénomènes physiques ?",
      "En quoi la géométrie est-elle essentielle dans l'architecture moderne ?",
      "Les mathématiques sont-elles découvertes ou inventées ?"
    ]
  },
  { 
    id: 'hggsp', 
    name: 'Histoire-Géographie, Géopolitique et Sciences Politiques',
    color: '#f87171',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop',
    subjects: [
      "La démocratie est-elle le meilleur régime politique ?",
      "Quelle est l'évolution des conflits internationaux depuis 1945 ?",
      "L'intelligence artificielle menace-t-elle la démocratie ?",
      "En quoi les nouvelles routes de la soie sont-elles un enjeu géopolitique majeur ?",
      "Comment la guerre froide a-t-elle redéfini les relations internationales ?",
      "Pourquoi le Moyen-Orient est-il une zone de tensions ?",
      "Le cyberespace est-il devenu un nouveau champ de bataille ?",
      "Comment la colonisation a-t-elle façonné les frontières actuelles ?",
      "L'Union européenne peut-elle devenir une superpuissance mondiale ?",
      "En quoi les tensions en mer de Chine menacent-elles l'équilibre mondial ?"
    ]
  },
  { 
    id: 'ses', 
    name: 'Sciences Économiques et Sociales',
    color: '#f472b6',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2915&auto=format&fit=crop',
    subjects: [
      "Comment l'inflation impacte-t-elle le pouvoir d'achat des ménages ?",
      "Quels sont les effets du télétravail sur la productivité ?",
      "Comment expliquer la croissance des inégalités économiques ?",
      "La mondialisation est-elle bénéfique pour les pays en développement ?",
      "En quoi les plateformes numériques transforment-elles le marché du travail ?",
      "Comment lutter efficacement contre le chômage en France ?",
      "Quel est l'impact des taux d'intérêt sur l'économie ?",
      "Pourquoi la publicité influence-t-elle nos décisions de consommation ?",
      "En quoi la crise de 2008 a-t-elle transformé les politiques économiques ?",
      "Comment les politiques écologiques influencent-elles les entreprises ?"
    ]
  },
  { 
    id: 'svt', 
    name: 'Sciences de la Vie et de la Terre',
    color: '#4ade80',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2940&auto=format&fit=crop',
    subjects: [
      "Pourquoi certaines maladies génétiques sont-elles plus fréquentes ?",
      "Comment les vaccins sont-ils développés ?",
      "Quel est l'impact du changement climatique sur la biodiversité ?",
      "Pourquoi dormons-nous ?",
      "Comment l'intestin influence-t-il notre cerveau ?",
      "En quoi l'ADN peut-il être utilisé dans les enquêtes criminelles ?",
      "Pourquoi certaines espèces disparaissent-elles plus vite ?",
      "Comment expliquer l'évolution des espèces selon Darwin ?",
      "Pourquoi la photosynthèse est-elle essentielle à la vie ?",
      "Comment fonctionne la mémoire humaine ?"
    ]
  },
  { 
    id: 'anglais', 
    name: 'Anglais LLCER',
    color: '#2dd4bf',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2946&auto=format&fit=crop',
    subjects: [
      "Comment la pop culture influence-t-elle la perception des États-Unis ?",
      "Le Brexit a-t-il affaibli le Royaume-Uni ?",
      "Comment la littérature dystopique reflète nos peurs contemporaines ?",
      "En quoi le cinéma hollywoodien façonne notre vision du monde ?",
      "Pourquoi l'anglais est-il devenu la langue des affaires ?",
      "Comment la politique américaine influence le reste du monde ?",
      "Quels sont les impacts du soft power britannique aujourd'hui ?",
      "En quoi la musique anglaise a marqué l'histoire du rock ?",
      "Comment la ségrégation a façonné la culture américaine ?",
      "Pourquoi Shakespeare est-il toujours aussi étudié ?"
    ]
  }
];

export default function SpecialtiesScreen() {
  const router = useRouter();

  const handleSpecialtyPress = (specialty) => {
    router.push({
      pathname: '/subjects/[id]',
      params: { id: specialty.id, subjects: JSON.stringify(specialty.subjects) }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Préparez votre Grand Oral</Text>
      <Text style={styles.subtitle}>Choisissez votre spécialité</Text>
      
      <View style={styles.grid}>
        {SPECIALTIES.map((specialty) => (
          <TouchableOpacity
            key={specialty.id}
            style={styles.card}
            onPress={() => handleSpecialtyPress(specialty)}
          >
            <Image
              source={{ uri: specialty.image }}
              style={styles.cardImage}
            />
            <View style={[styles.cardOverlay, { backgroundColor: specialty.color + '99' }]}>
              <Text style={styles.cardText}>{specialty.name}</Text>
              <Text style={styles.subjectsCount}>{specialty.subjects.length} sujets disponibles</Text>
            </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    padding: 16,
    gap: 16,
  },
  card: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  cardText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subjectsCount: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
});