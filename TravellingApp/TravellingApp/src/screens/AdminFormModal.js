import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function AdminFormModal({ route, navigation }) {
  const { type, item } = route.params || {};
  const [formData, setFormData] = useState(item || {});

  const handleSave = async () => {
    try {
      const url = type === 'product' ? 'http://localhost:3000/products' : 'http://localhost:3000/users';
      const method = item ? 'PUT' : 'POST';
      const response = await fetch(item ? `${url}/${item.id}` : url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save');
      Alert.alert('Success', `${type} saved successfully`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item ? `Edit ${type}` : `Add ${type}`}</Text>
      {type === 'product' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name || ''}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={formData.category || ''}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={formData.price?.toString() || ''}
            onChangeText={(text) => setFormData({ ...formData, price: parseFloat(text) })}
          />
        </>
      )}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
