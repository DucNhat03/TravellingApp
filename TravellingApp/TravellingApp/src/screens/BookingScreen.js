import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/bookings'); // Thay bằng API của bạn
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Alert.alert('Error', 'Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/100' }}
        style={styles.bookingImage}
      />
      <View style={styles.bookingDetails}>
        <Text style={styles.bookingTitle}>{item.title}</Text>
        <Text style={styles.bookingDate}>Date: {item.date}</Text>
        <Text style={styles.bookingPrice}>Amount: ${item.amount}</Text>
      </View>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => Alert.alert('Booking Details', `Details for booking ${item.id}`)}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading bookings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookingItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No bookings found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContent: {
    paddingBottom: 16,
  },
  bookingItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  bookingDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  bookingDate: {
    fontSize: 14,
    color: '#777',
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsButton: {
    backgroundColor: '#00bfff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookingScreen;
