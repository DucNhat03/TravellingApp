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
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const userId = route.params?.userId;

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId);
    } else {
      Alert.alert("Error", "User ID not provided.");
      setLoading(false);
    }
  }, [userId]);

  const fetchProfileData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      if (response.data) {
        setProfileData(response.data);
      } else {
        Alert.alert("Error", "User not found.");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      Alert.alert("Error", "Could not fetch profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${userId}`, profileData);
      Alert.alert("Success", "Profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Could not update profile.");
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleLogout = () => {
    navigation.replace("Login");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../Image/dataicon/backicon.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={{
            uri: profileData.avatar_url || "https://via.placeholder.com/100",
          }}
          style={styles.avatar}
        />
        <TextInput
          style={[
            styles.usernameInput,
            isEditing && { borderBottomWidth: 1, borderColor: "#ccc" },
          ]}
          value={profileData.username}
          editable={isEditing}
          onChangeText={(text) =>
            setProfileData((prev) => ({ ...prev, username: text }))
          }
        />
        <Text style={styles.position}>
          {`${profileData.country_code || "--"} ${profileData.phone_number || "--"}`}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profileData.email}
          editable={isEditing}
          onChangeText={(text) =>
            setProfileData((prev) => ({ ...prev, email: text }))
          }
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={profileData.phone_number}
          editable={isEditing}
          onChangeText={(text) =>
            setProfileData((prev) => ({ ...prev, phone_number: text }))
          }
        />

        <Text style={styles.label}>Country Code</Text>
        <TextInput
          style={styles.input}
          value={profileData.country_code}
          editable={isEditing}
          onChangeText={(text) =>
            setProfileData((prev) => ({ ...prev, country_code: text }))
          }
        />
      </View>

      <View style={styles.footerContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginTop: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
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
  usernameInput: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    width: "80%",
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
  footerContainer: {
    paddingBottom: 20,
  },
  editButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
