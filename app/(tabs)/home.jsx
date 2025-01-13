import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { categories } from '../data/categories';

export default function Home() {
  const router = useRouter();

  const handleCategorySelect = (category) => {
    router.push({ pathname: '/game', params: { category } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selectează o categorie:</Text>

      {Object.keys(categories).map((category) => (
        <TouchableOpacity
          key={category}
          style={styles.categoryButton}
          onPress={() => handleCategorySelect(category)}
        >
          <Text style={styles.buttonText}>{category.replace('_', ' ')}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
