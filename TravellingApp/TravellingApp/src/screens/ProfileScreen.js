import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";

const ProfileScreen = ({ navigation, route }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    avatar_url: "",
    email: "",
    phone_number: "",
    country_code: "",
  });

  // Fetch the userId passed from HomeScreen
  const userId = route.params?.userId;

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId); // Fetch user data by userId
    } else {
      Alert.alert("Error", "User data not found.");
    }
  }, [userId]);

  const fetchProfileData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setProfileData(response.data);  // Set the user data
    } catch (error) {
      console.error("Error fetching profile data:", error);
      Alert.alert("Error", "Could not fetch profile data.");
    }
  };

  const handleLogout = () => {
    navigation.replace("Login");
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${profileData.id}`);
      Alert.alert("Thông báo", "Xóa tài khoản thành công.");
      navigation.replace("Login");
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Lỗi", "Không thể xóa tài khoản.");
    }
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <View style={styles.container}>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>
          <Image
            source={require("../Image/dataicon/backicon.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <View style={styles.header}>
          <Image source={{ uri: profileData.avatar_url }} style={styles.avatar} />
          <Text style={styles.username}>{profileData.username}</Text>
          <Text style={styles.position}>{`${profileData.country_code} ${profileData.phone_number}`}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Your Email</Text>
          <TextInput style={styles.input} value={profileData.email || ""} editable={false} />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={profileData.phone_number || ""}
            editable={false}
          />

          <Text style={styles.label}>Country Code</Text>
          <TextInput
            style={styles.input}
            value={profileData.country_code || ""}
            editable={false}
          />
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fefefe",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "contain",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  position: {
    fontSize: 16,
    color: "#666",
  },
  infoContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    paddingBottom: 10,
  },
});

export default ProfileScreen;
