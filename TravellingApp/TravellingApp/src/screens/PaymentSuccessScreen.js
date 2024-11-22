import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const PaymentSuccessScreen = ({ route, navigation }) => {
  const { bookingDetails } = route.params || {};

  // console.log(bookingDetails.userID, bookingDetails.productID);

  const formattedDate = new Date(bookingDetails.date)
    .toISOString()
    .split("T")[0]; // Chuyển sang YYYY-MM-DD
  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes, seconds] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours) + 12);
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}:${seconds}`;
  };
  const formattedTime = convertTo24HourFormat(bookingDetails.time);

  const createPDF = async () => {
    if (!bookingDetails) {
      Alert.alert("Error", "No booking details available.");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #4CAF50; }
            .details { margin: 20px 0; }
            .details p { margin: 5px 0; }
            .details span { font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <h1>Payment Receipt</h1>
          <div class="details">
            <p><span>Booking Ref:</span> ${bookingDetails.refNumber}</p>
            <p><span>Date:</span> ${bookingDetails.date}</p>
            <p><span>Time:</span> ${bookingDetails.time}</p>
            <p><span>Payment Method:</span> ${bookingDetails.paymentMethod}</p>
            <p><span>Guests:</span> ${bookingDetails.guests}</p>
            <p><span>Trip Dates:</span> ${bookingDetails.tripDates}</p>
            <p><span>Amount:</span> $${bookingDetails.totalAmount}</p>
          </div>
          <div class="footer">
            Thank you for booking with us!
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (Platform.OS === "ios" || Platform.OS === "android") {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Success", "PDF saved successfully.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to create PDF.");
    }
  };
  const addBookingToDatabase = async () => {
    if (!bookingDetails) {
      Alert.alert("Error", "No booking details available.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: bookingDetails.userID, // ID người dùng
          product_id: bookingDetails.productID, // ID sản phẩm
          booking_date: formattedDate, // Ngày đặt
          booking_time: formattedTime, // Giờ đặt
          amount: bookingDetails.totalAmount, // Tổng tiền
          status: "Pending", // Trạng thái mặc định
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Booking added successfully!");
        navigation.navigate("BookingScreen");
      } else {
        Alert.alert("Error", data.error || "Failed to add booking.");
      }
    } catch (error) {
      console.error("Error adding booking:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Icon Success */}
      <Image
        source={require("../Image/dataicon/checkBigSize.png")}
        style={styles.successIcon}
      />

      {/* Title */}
      <Text style={styles.title}>Payment success!</Text>

      {/* Transaction Details */}
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking Ref:</Text>
          <Text style={styles.detailValue}>
            {bookingDetails?.refNumber || "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>
            {bookingDetails?.date || "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time:</Text>
          <Text style={styles.detailValue}>
            {bookingDetails?.time || "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method:</Text>
          <Text style={styles.detailValue}>
            {bookingDetails?.paymentMethod || "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Guests:</Text>
          <Text style={styles.detailValue}>
            {bookingDetails?.guests || "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Trip Dates:</Text>
          <Text style={styles.detailValue}>
            {bookingDetails?.tripDates || "N/A"}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Amount:</Text>
          <Text style={styles.detailValue}>
            ${bookingDetails?.totalAmount || "N/A"}
          </Text>
        </View>
      </ScrollView>

      {/* PDF Receipt Button */}
      <TouchableOpacity style={styles.pdfButton} onPress={createPDF}>
        <Text style={styles.pdfButtonText}>Download PDF receipt</Text>
      </TouchableOpacity>

      {/* View Booking Button */}
      <TouchableOpacity
        style={styles.viewBookingButton}
        onPress={addBookingToDatabase}
      >
        <Text style={styles.viewBookingButtonText}>View booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailLabel: {
    fontSize: 14,
    color: "#777",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  pdfButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  pdfButtonText: {
    fontSize: 16,
    color: "#333",
  },
  viewBookingButton: {
    width: "100%",
    backgroundColor: "#00bfff",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  viewBookingButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PaymentSuccessScreen;
