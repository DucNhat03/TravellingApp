import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";

const SearchScreen = ({ navigation }) => {
  const destinations = [
    { id: "1", name: "Anywhere", image: require("../Image/homescreen/ApartmentinOmaha.png") },
    { id: "2", name: "Europe", image: require("../Image/homescreen/ApartmentinOmaha.png") },
    { id: "3", name: "Asia", image: require("../Image/homescreen/ApartmentinOmaha.png") },
  ];
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Title & Search Box */}
      <View style={styles.navBar}>
        <Text style={styles.title}>Where to?</Text>
        <View style={styles.search}>
          <TouchableOpacity>
            <Image
              source={require("../Image/dataicon/search.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={styles.inputSeacrch}
          ></TextInput>
        </View>
      </View>

      {/* Destination Options */}
      <View>
        {/* Destination Options */}
        <FlatList
          data={destinations}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationOptions}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.destinationItem}>
              <Image source={item.image} style={styles.destinationImage} />
              <Text style={styles.destinationText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Time and Guests */}
      <View style={styles.optionRow}>
        <View style={styles.optionItem}>
          <Text style={styles.optionLabel}>When</Text>
          <TouchableOpacity onPress={() => {navigation.navigate('DateSelectionScreen')}}>
            <Text style={styles.optionValue}>Add time</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionItem}>
          <Text style={styles.optionLabel}>Guests</Text>
          <TouchableOpacity onPress={() => {navigation.navigate('GuestSelectionScreen')}}>
            <Text style={styles.optionValue}>Add guests</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Image
            source={require("../Image/dataicon/search.png")}
            style={styles.searchIconButton}
          />
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "space-around",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
  },
  navBar: {
    width: "100%",
    height: 80,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 16,
    color: "#777",
  },
  search: {
    width: "95%",
    height: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    position: "absolute",
    top: -8,
    left: 10,
  },
  searchIconButton: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  inputSeacrch: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingLeft: 40,
    objectFit: true,
  },
  destinationItem: {
    alignItems: "center",
    width: "30%",
  },
  destinationImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 4,
  },
  destinationText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  optionRow: {
    justifyContent: "space-between",
    width: "95%",
    height: 70,
  },
  optionItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionLabel: {
    fontSize: 14,
    color: "#777",
  },
  optionValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearText: {
    fontSize: 16,
    color: "#777",
  },
  searchButton: {
    backgroundColor: "#00bfff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
    height: 40,
    paddingVertical: 5,
  },
  searchButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  destinationOptions: {
    width: '100%',
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  destinationItem: {
    alignItems: "center",
    width: '100%',
    height: 150,
  },
  destinationImage: {
    width: 180,
    height: 120,
    resizeMode: "contain",
  },
  destinationText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SearchScreen;
