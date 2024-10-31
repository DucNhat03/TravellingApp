import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ConfirmAndPayScreen = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('full');

  return (
    <View style={{ height: '100vh', overflow: 'auto' }}>
    <ScrollView style={styles.container}>
      {/* Room Information */}
      <View style={styles.roomInfo}>
        <Text style={styles.price}>$20/night</Text>
        <View style={styles.roomDetails}>
          <Text>Balian treehouse</Text>
          <Text style={styles.rating}>⭐ 5.0 (262)</Text>
        </View>
        <Image source={require('../homescreen/ApartmentinOmaha.png')} style={styles.thumbnail} />
      </View>

      {/* Trip Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your trip</Text>
        <View style={styles.tripDetail}>
          <Text>Dates</Text>
          <Text>May 1 - 6</Text>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tripDetail}>
          <Text>Guests</Text>
          <Text>1 guest</Text>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment options</Text>
        <View style={styles.paymentOption}>
          <TouchableOpacity onPress={() => setSelectedPaymentOption('full')} style={styles.radioButtonContainer}>
            <Text style={styles.radioButton}>{selectedPaymentOption === 'full' ? '◉' : '○'}</Text>
            <View>
              <Text style={styles.optionTitle}>Pay in full</Text>
              <Text style={styles.optionDescription}>Pay $30 now to finalize your booking.</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.paymentOption}>
          <TouchableOpacity onPress={() => setSelectedPaymentOption('partial')} style={styles.radioButtonContainer}>
            <Text style={styles.radioButton}>{selectedPaymentOption === 'partial' ? '◉' : '○'}</Text>
            <View>
              <Text style={styles.optionTitle}>Pay a part now</Text>
              <Text style={styles.optionDescription}>You can make a partial payment now and the remaining amount at a later time.</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Price Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price details</Text>
        <View style={styles.priceDetailRow}>
          <Text>$20 x 1 night</Text>
          <Text>$20</Text>
        </View>
        <View style={styles.priceDetailRow}>
          <Text>Kayak fee</Text>
          <Text>$5</Text>
        </View>
        <View style={styles.priceDetailRow}>
          <Text>Street parking fee</Text>
          <Text>$5</Text>
        </View>
        <View style={styles.priceDetailRow}>
          <Text style={styles.totalText}>Total (USD)</Text>
          <Text style={styles.totalText}>$30</Text>
        </View>
      </View>

      {/* Book Now Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book now</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  roomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roomDetails: {
    flex: 1,
    marginLeft: 8,
  },
  rating: {
    fontSize: 14,
    color: '#777',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tripDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  editIcon: {
    color: '#00bfff',
    fontSize: 16,
  },
  paymentOption: {
    marginVertical: 8,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    fontSize: 18,
    marginRight: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 14,
    color: '#777',
  },
  priceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfirmAndPayScreen;
