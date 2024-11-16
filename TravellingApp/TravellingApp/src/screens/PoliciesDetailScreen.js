import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";

const PoliciesDetailScreen = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require("../Image/dataicon/backicon.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Policies</Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>House Rules</Text>
          <View style={styles.ruleContainer}>
            <View style={styles.ruleItem}>
              <Image
                source={require("../Image/dataicon/checkinicon.png")}
                style={styles.icon}
              />
              <Text style={styles.ruleText}>Earliest check-in time: 14:00</Text>
            </View>
            <View style={styles.ruleItem}>
              <Image
                source={require("../Image/dataicon/checkouticon.png")}
                style={styles.icon}
              />
              <Text style={styles.ruleText}>Latest check-out time: 12:00</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Checkin Policies</Text>
          <Text style={styles.description}>
            It’s always a good idea to confirm the check-in policy directly with
            the owner/manager to avoid any confusion during your stay. Ensure to
            understand the terms and conditions applied.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  scrollContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  ruleContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  ruleItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  ruleText: {
    fontSize: 16,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    lineHeight: 20,
  },
});

export default PoliciesDetailScreen;
