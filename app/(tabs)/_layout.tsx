import { Tabs } from 'expo-router';
import { Book, Search, PenTool, MessageSquare, Video } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopColor: '#e5e5e5',
      },
      tabBarActiveTintColor: '#6366f1',
      tabBarInactiveTintColor: '#94a3b8',
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTitleStyle: {
        color: '#1e293b',
        fontWeight: 'bold',
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Spécialités',
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="research"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="outline"
        options={{
          title: 'Plan',
          tabBarIcon: ({ color, size }) => <PenTool size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="speech"
        options={{
          title: 'Discours',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Pratique',
          tabBarIcon: ({ color, size }) => <Video size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}