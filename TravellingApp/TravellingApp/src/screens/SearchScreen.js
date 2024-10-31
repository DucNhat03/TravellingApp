import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Where to?</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* Destination Options */}
      <View style={styles.destinationOptions}>
        <View style={styles.destinationItem}>
          <Image source={require('../searchscreen/euro.png')} style={styles.destinationImage} />
          <Text style={styles.destinationText}>Anywhere</Text>
        </View>
        <View style={styles.destinationItem}>
          <Image source={require('../searchscreen/euro.png')} style={styles.destinationImage} />
          <Text style={styles.destinationText}>Europe</Text>
        </View>
        <View style={styles.destinationItem}>
          <Image source={require('../searchscreen/euro.png')} style={styles.destinationImage} />
          <Text style={styles.destinationText}>Asia</Text>
        </View>
      </View>

      {/* Time and Guests */}
      <View style={styles.optionRow}>
        <View style={styles.optionItem}>
          <Text style={styles.optionLabel}>When</Text>
          <TouchableOpacity onPress={() => {navigation.navigate("DateSelectionScreen")}}>
            <Text style={styles.optionValue}>Add time</Text>
          </TouchableOpacity>    
        </View>
        <View style={styles.optionItem}>
          <Text style={styles.optionLabel}>Guests</Text>
          <Text style={styles.optionValue}>Add guests</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 16,
    color: '#777',
  },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 16,
  },
  destinationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  destinationItem: {
    alignItems: 'center',
    width: '30%',
  },
  destinationImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 4,
  },
  destinationText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  optionItem: {
    width: '48%',
  },
  optionLabel: {
    fontSize: 14,
    color: '#777',
  },
  optionValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 16,
    color: '#777',
  },
  searchButton: {
    backgroundColor: '#00bfff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  searchButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SearchScreen;
