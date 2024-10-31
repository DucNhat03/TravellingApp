import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, CheckBox } from 'react-native';

const FilterScreen = () => {
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(250);
  const [selectedType, setSelectedType] = useState({
    entirePlace: true,
    privateRoom: false,
    dormitory: false,
  });

  const toggleType = (type) => {
    setSelectedType((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Price Range */}
      <Text style={styles.sectionTitle}>Price range</Text>
      <View style={styles.priceRangeContainer}>
        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.priceInputs}>
          <TextInput
            style={styles.priceInput}
            value={`US$${minPrice}`}
            editable={false}
          />
          <Text style={styles.priceSeparator}>-</Text>
          <TextInput
            style={styles.priceInput}
            value={`US$${maxPrice}`}
            editable={false}
          />
        </View>
        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Type of Place */}
      <Text style={styles.sectionTitle}>Type of place</Text>
      <View style={styles.typeContainer}>
        <View style={styles.typeOption}>
          <CheckBox
            value={selectedType.entirePlace}
            onValueChange={() => toggleType('entirePlace')}
          />
          <View>
            <Text style={styles.typeTitle}>Entire place</Text>
            <Text style={styles.typeDescription}>Entire apartments, condos, houses</Text>
          </View>
        </View>

        <View style={styles.typeOption}>
          <CheckBox
            value={selectedType.privateRoom}
            onValueChange={() => toggleType('privateRoom')}
          />
          <View>
            <Text style={styles.typeTitle}>Private room</Text>
            <Text style={styles.typeDescription}>
              Typically come with a private bathroom unless otherwise stated
            </Text>
          </View>
        </View>

        <View style={styles.typeOption}>
          <CheckBox
            value={selectedType.dormitory}
            onValueChange={() => toggleType('dormitory')}
          />
          <View>
            <Text style={styles.typeTitle}>Dormitories</Text>
            <Text style={styles.typeDescription}>
              Large rooms with multiple beds that are shared with others
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resultsButton}>
          <Text style={styles.resultsButtonText}>View Results</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 16,
    color: '#777',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  arrowButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
  },
  arrowText: {
    fontSize: 18,
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  priceInput: {
    width: 80,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginHorizontal: 4,
  },
  priceSeparator: {
    fontSize: 18,
    color: '#777',
  },
  typeContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  clearText: {
    fontSize: 16,
    color: '#777',
  },
  resultsButton: {
    backgroundColor: '#00bfff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  resultsButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FilterScreen;
