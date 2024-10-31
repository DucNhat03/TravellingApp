import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GuestSelectionScreen = () => {
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  const increaseAdults = () => setAdultsCount(adultsCount + 1);
  const decreaseAdults = () => {
    if (adultsCount > 0) setAdultsCount(adultsCount - 1);
  };

  const increaseChildren = () => setChildrenCount(childrenCount + 1);
  const decreaseChildren = () => {
    if (childrenCount > 0) setChildrenCount(childrenCount - 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.locationValue}>Anywhere</Text>
      </View>

      {/* Dates */}
      <View style={styles.datesContainer}>
        <Text style={styles.datesLabel}>Dates</Text>
        <Text style={styles.datesValue}>23 - 31 May</Text>
      </View>

      {/* Guest Selection */}
      <View style={styles.guestContainer}>
        <Text style={styles.guestTitle}>How many guests?</Text>

        <View style={styles.guestRow}>
          <Text style={styles.guestLabel}>Adults</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity onPress={decreaseAdults} style={styles.counterButton}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.guestCount}>{adultsCount}</Text>
            <TouchableOpacity onPress={increaseAdults} style={styles.counterButton}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.guestRow}>
          <Text style={styles.guestLabel}>Children</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity onPress={decreaseChildren} style={styles.counterButton}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.guestCount}>{childrenCount}</Text>
            <TouchableOpacity onPress={increaseChildren} style={styles.counterButton}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 16,
    color: '#777',
  },
  locationValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  datesLabel: {
    fontSize: 16,
    color: '#777',
  },
  datesValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  guestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  guestLabel: {
    fontSize: 16,
    color: '#333',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  counterText: {
    fontSize: 18,
    color: '#333',
  },
  guestCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
  searchButton: {
    backgroundColor: '#00bfff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GuestSelectionScreen;
