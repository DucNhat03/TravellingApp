import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const DescriptionScreen = ({ route, navigation }) => {
  const { image, description } = route.params; // Nhận hình ảnh và mô tả từ params

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../Image/descriptionscreen/backicon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Description</Text>
      </View>

      {/* Image */}
      <Image
        source={{ uri: image }} // Hiển thị hình ảnh nhận được từ DetailScreen
        style={styles.image}
      />

      {/* Description Text */}
      <Text style={styles.descriptionText}>
        {description} {/* Hiển thị mô tả nhận được */}
      </Text>

      {/* Location */}
      <View style={styles.locationContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../Image/descriptionscreen/location.png")}
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>Bali, Indonesia</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MapScreen", {
              location: { latitude: -8.409518, longitude: 115.188919 }, // Vị trí Bali
              title: "Bali, Indonesia",
            })
          }
        >
          <Text style={styles.openMap}>Open map</Text>
        </TouchableOpacity>
      </View>

      {/* Features List */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <Image
            source={require("../Image/descriptionscreen/check.png")}
            style={styles.checkIcon}
          />
          <Text style={styles.featureText}>Consectetur magna consectetur</Text>
        </View>
        <View style={styles.featureItem}>
          <Image
            source={require("../Image/descriptionscreen/check.png")}
            style={styles.checkIcon}
          />
          <Text style={styles.featureText}>
            Voluptate magna fugiat tempor incididunt
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Image
            source={require("../Image/descriptionscreen/check.png")}
            style={styles.checkIcon}
          />
          <Text style={styles.featureText}>
            Aliqua in in mollit laboris tempor in ut incididunt
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "30%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  locationIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#333",
    marginRight: 8,
  },
  openMap: {
    fontSize: 14,
    color: "#1e90ff",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginRight: 8,
  },
  featuresContainer: {
    marginTop: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#333",
  },
});

export default DescriptionScreen;
