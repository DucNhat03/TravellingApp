import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import axios from "axios";

const BookingScreen = ({navigation}) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); // Dữ liệu chi tiết booking
  const [isModalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      Alert.alert("Error", "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (booking) => {
    setSelectedBooking(booking); // Lưu thông tin chi tiết của booking
    setModalVisible(true); // Hiển thị modal
  };

  const renderBookingItem = ({ item }) => {
    const formattedDate = new Date(item.booking_date).toLocaleDateString();

    return (
      <View style={styles.bookingItem}>
        <Image
          source={{
            uri: item.product_image || "https://via.placeholder.com/100",
          }}
          style={styles.bookingImage}
        />
        <View style={styles.bookingDetails}>
          <Text style={styles.bookingTitle}>{item.product_name}</Text>
          <Text style={styles.bookingDate}>Date: {formattedDate}</Text>
          <Text style={styles.bookingPrice}>Amount: ${item.amount}</Text>
        </View>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => handleDetails(item)}
        >
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading bookings...</Text>
      </View>
    );
  }

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Bookings</Text>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No bookings found.</Text>
          }
        />
        {/* Back to Home Button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")} // Điều hướng về màn hình Home
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

        {/* Modal for Booking Details */}
        {selectedBooking && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <ScrollView contentContainerStyle={styles.modalContent}>
                <Text style={styles.modalTitle}>Booking Details</Text>
                <Image
                  source={{ uri: selectedBooking.product_image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Product Name: </Text>
                  {selectedBooking.product_name}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Date: </Text>
                  {new Date(selectedBooking.booking_date).toLocaleDateString()}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Time: </Text>
                  {selectedBooking.booking_time}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Amount: </Text>$
                  {selectedBooking.amount}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Status: </Text>
                  {selectedBooking.status}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>User: </Text>
                  {selectedBooking.user_name}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  listContent: {
    paddingBottom: 16,
  },
  bookingItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
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
    justifyContent: "center",
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  bookingDate: {
    fontSize: 14,
    color: "#777",
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  detailsButton: {
    backgroundColor: "#00bfff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  modalLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#00bfff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#00bfff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  homeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BookingScreen;
