import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";

const ConfirmAndPayScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [tripDates, setTripDates] = useState("Select dates");
  const [guests, setGuests] = useState("Select guests");
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isGuestModalVisible, setGuestModalVisible] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Pay in full");
  const [totalPrice, setTotalPrice] = useState(product?.price || 0);

  const openDateModal = () => setDateModalVisible(true);
  const closeDateModal = () => setDateModalVisible(false);

  const openGuestModal = () => setGuestModalVisible(true);
  const closeGuestModal = () => setGuestModalVisible(false);

  const generateIntermediateDates = (start, end) => {
    let dates = {};
    let current = new Date(start);

    while (current < new Date(end)) {
      const formattedDate = current.toISOString().split("T")[0];
      dates[formattedDate] = { color: "#d3faff", textColor: "black" };
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const calculateDays = (start, end) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    return Math.ceil((endTime - startTime) / (1000 * 3600 * 24));
  };

  const calculateTotalPrice = () => {
    const days = startDate && endDate ? calculateDays(startDate, endDate) : 1;
    const basePrice = (product?.price || 0) * days;
    const guestFee = (adultsCount + childrenCount - 1) * 10;
    const additionalFees = 10; // Example: Kayak fee + parking fee
    setTotalPrice(basePrice + guestFee + additionalFees);
  };

  const handleConfirmDates = () => {
    if (startDate && endDate) {
      const daysCount = calculateDays(startDate, endDate);
      setTripDates(`${startDate} - ${endDate} (${daysCount} days)`);
      calculateTotalPrice();
    }
    closeDateModal();
  };

  const handleConfirmGuests = () => {
    setGuests(`${adultsCount} adults, ${childrenCount} children`);
    calculateTotalPrice();
    closeGuestModal();
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../Image/dataicon/backicon.png")}
              style={styles.backButtonText}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          {/* Room Information */}
          <View style={styles.roomInfo}>
            <View>
              <Text style={styles.roomName}>{product?.name || "Room Name"}</Text>
              <Text style={styles.rating}>⭐ {product?.rating || 0}</Text>
              <Text style={styles.price}>${product?.price || 0}/night</Text>
            </View>
            
            <Image
              source={{
                uri: product?.image_url || "https://via.placeholder.com/150",
              }}
              style={styles.roomImage}
            />
          </View>

          {/* Trip Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your trip</Text>
            <View style={styles.tripDetail}>
              <Text>Dates</Text>
              <Text>{tripDates}</Text>
              <TouchableOpacity onPress={openDateModal}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tripDetail}>
              <Text>Guests</Text>
              <Text>{guests}</Text>
              <TouchableOpacity onPress={openGuestModal}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment options</Text>
            <TouchableOpacity onPress={() => setPaymentMethod("Pay in full")}>
              <Text
                style={
                  paymentMethod === "Pay in full"
                    ? styles.selected
                    : styles.option
                }
              >
                Pay in full
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPaymentMethod("Pay a part now")}
            >
              <Text
                style={
                  paymentMethod === "Pay a part now"
                    ? styles.selected
                    : styles.option
                }
              >
                Pay a part now
              </Text>
            </TouchableOpacity>
          </View>

          {/* Price Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price details</Text>
            <View style={styles.priceDetail}>
              <Text>
                ${product?.price || 0} x{" "}
                {startDate && endDate ? calculateDays(startDate, endDate) : 1}{" "}
                night(s)
              </Text>
              <Text>
                $
                {(product?.price || 0) *
                  (startDate && endDate
                    ? calculateDays(startDate, endDate)
                    : 1)}
              </Text>
            </View>
            <View style={styles.priceDetail}>
              <Text>Extra guests</Text>
              <Text>${(adultsCount + childrenCount - 1) * 10}</Text>
            </View>
            <View style={styles.priceDetail}>
              <Text>Total (USD)</Text>
              <Text>${totalPrice}</Text>
            </View>
          </View>

          {/* Book Now Button */}
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              const bookingDetails = {
                refNumber: Math.random()
                  .toString(36)
                  .substr(2, 10)
                  .toUpperCase(), // Tạo mã ngẫu nhiên
                date: new Date().toLocaleDateString(), // Ngày hiện tại
                time: new Date().toLocaleTimeString(), // Giờ hiện tại
                paymentMethod: paymentMethod, // Phương thức thanh toán
                guests: `${adultsCount} adults, ${childrenCount} children`, // Số lượng khách
                tripDates:
                  startDate && endDate
                    ? `${startDate} to ${endDate}`
                    : startDate || "N/A", // Ngày đi
                totalAmount: totalPrice, // Tổng số tiền
                userID: product.userID, //
                productID: product.id, //
              };

              navigation.navigate("PaymentSuccessScreen", { bookingDetails });
            }}
          >
            <Text style={styles.bookButtonText}>Book now</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Date Modal */}
        <Modal visible={isDateModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Dates</Text>
            <Calendar
              onDayPress={(day) => {
                const selectedDate = day.dateString;

                if (!startDate || (startDate && endDate)) {
                  // Nếu chưa chọn hoặc đã hoàn thành một chu kỳ, bắt đầu lại
                  setStartDate(selectedDate);
                  setEndDate(null);
                } else if (startDate && !endDate) {
                  // Nếu đã có startDate nhưng chưa có endDate
                  if (new Date(selectedDate) > new Date(startDate)) {
                    setEndDate(selectedDate);
                  } else {
                    // Nếu ngày được chọn nhỏ hơn startDate, đặt lại startDate
                    setStartDate(selectedDate);
                    setEndDate(null);
                  }
                }
              }}
              markingType="period"
              markedDates={{
                ...(startDate && {
                  [startDate]: {
                    startingDay: true,
                    color: "#00bfff",
                    textColor: "white",
                  },
                }),
                ...(endDate && {
                  [endDate]: {
                    endingDay: true,
                    color: "#00bfff",
                    textColor: "white",
                  },
                }),
                ...(startDate &&
                  endDate && {
                    ...generateIntermediateDates(startDate, endDate),
                  }),
              }}
            />

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmDates}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Guests Modal */}
        <Modal visible={isGuestModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>How many guests?</Text>

            {/* Adults */}
            <View style={styles.guestRow}>
              <Text style={styles.guestRowText}>Adults</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{adultsCount}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => setAdultsCount(adultsCount + 1)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Children */}
            <View style={styles.guestRow}>
              <Text style={styles.guestRowText}>Children</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() =>
                    setChildrenCount(Math.max(0, childrenCount - 1))
                  }
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{childrenCount}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => setChildrenCount(childrenCount + 1)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Button */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmGuests}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  backButtonText: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roomInfo: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roomName: {
    fontSize: 16,
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  roomImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tripDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  editText: {
    color: "#00bfff",
    fontSize: 14,
  },
  paymentOption: {
    marginVertical: 8,
  },
  option: {
    fontSize: 14,
    color: "#777",
    marginVertical: 4,
  },
  selected: {
    fontSize: 14,
    color: "#00bfff",
    fontWeight: "bold",
    marginVertical: 4,
  },
  priceDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  bookButton: {
    backgroundColor: "#00bfff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  calendar: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  confirmButton: {
    backgroundColor: "#00bfff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  guestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  guestRowText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
  },
  counterButton: {
    width: 30,
    height: 30,
    backgroundColor: "#00bfff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#00bfff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
});

export default ConfirmAndPayScreen;
