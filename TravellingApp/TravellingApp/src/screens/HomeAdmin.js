import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function AdminHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminProductManagement')}
      >
        <Text style={styles.buttonText}>Manage Products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminUserManagement')}
      >
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
