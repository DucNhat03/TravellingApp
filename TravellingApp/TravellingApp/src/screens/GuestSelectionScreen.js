import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GuestSelectionScreen = () => {
  const navigation = useNavigation();
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
      <View style={styles.containerTop}>
        <View style={styles.closeContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeText}>x</Text>
          </TouchableOpacity>
        </View>
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
              <TouchableOpacity
                onPress={decreaseAdults}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.guestCount}>{adultsCount}</Text>
              <TouchableOpacity
                onPress={increaseAdults}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.guestRow}>
            <Text style={styles.guestLabel}>Children</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                onPress={decreaseChildren}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.guestCount}>{childrenCount}</Text>
              <TouchableOpacity
                onPress={increaseChildren}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() =>
            navigation.navigate("ConfirmAndPayScreen", {
              guests: `${adultsCount} adults, ${childrenCount} children`,
            })
          }
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
    justifyContent: "space-between",
  },
  containerTop: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 16,
    color: "#777",
    marginLeft: 10,
  },
  locationValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  datesContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginRight: 10,
    marginLeft: 10,
  },
  datesLabel: {
    fontSize: 16,
    color: "#777",
  },
  datesValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  guestContainer: {
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    justifyContent: "space-between",
    height: 250,
    borderWidth: 1,
    borderColor: "#777",
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  guestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  guestLabel: {
    fontSize: 16,
    color: "#333",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  counterText: {
    fontSize: 18,
    color: "#333",
  },
  guestCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    width: "95%",
    marginLeft: 10,
  },
  clearText: {
    fontSize: 16,
    color: "#777",
  },
  searchButton: {
    backgroundColor: "#00bfff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  closeContainer: {
    marginTop: 0,
    alignItems: "flex-end",
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 22,
    color: "#777",
  },
});

export default GuestSelectionScreen;
