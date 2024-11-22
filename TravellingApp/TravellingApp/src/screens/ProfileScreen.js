import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";

const ProfileScreen = ({ navigation, route }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    avatar_url: "",
    email: "",
    phone_number: "",
    country_code: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const userId = route.params?.userId;

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId);
    } else {
      setModalMessage("User ID not provided.");
      setModalVisible(true);
      setLoading(false);
    }
  }, [userId]);

  const fetchProfileData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      if (response.data) {
        setProfileData(response.data);
      } else {
        setModalMessage("User not found.");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setModalMessage("Could not fetch profile data.");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${userId}`, profileData);
      setModalMessage("Profile updated successfully.");
      setModalVisible(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setModalMessage("Could not update profile.");
      setModalVisible(true);
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleLogout = () => {
    navigation.replace("Login");
  };

  const handleSelectAvatar = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const selectedImage = response.assets[0];
        setProfileData((prev) => ({ ...prev, avatar_url: selectedImage.uri }));
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#33CCFF" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <View style={styles.container}>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
          <TouchableOpacity onPress={handleSelectAvatar} disabled={!isEditing}>
            <Image
              source={{
                uri:
                  profileData.avatar_url || "https://via.placeholder.com/100",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.usernameText}>{profileData.username}</Text>
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
            <TouchableOpacity
              style={styles.editButton}
              onPress={toggleEditMode}
            >
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
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
    backgroundColor: "#FAF0E6",
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
    borderWidth: 2,
    borderColor: "#33CCFF",
  },
  usernameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: 300,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#33CCFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
