import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const ProfileScreen = ({ navigation, route }) => {
  // Lấy dữ liệu từ route params hoặc backend
  const [profileData, setProfileData] = useState({
    username: "Nguyen Duc Nhat",
    avatar:"https://i.imgur.com/6DOZGda.jpeg",
    position: "Data Analysis",
    email: "ducnhat09@gmail.com",
    phone: "+0339992221",
    website: "www.ducnhatdev1.com",
    password: "********",
  });

  useEffect(() => {
    // Nếu dữ liệu được truyền qua route.params từ màn hình khác
    if (route.params && route.params.profile) {
      setProfileData(route.params.profile);
    }

    // Nếu dùng backend, đây là nơi để gọi API lấy thông tin
    // fetchProfileData();
  }, [route.params]);

  const handleLogout = () => {
    navigation.replace("Login2");
  };

  const handleDeleteAccount = () => {
    // Thực hiện xóa tài khoản qua API
    console.log("Account deleted");
    navigation.replace("Login");
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <View style={styles.container}>
        {/*back*/}
        <TouchableOpacity
            style={{ marginTop: 20, }}
            onPress={() => navigation.goBack()}
        >
            <Image
                source={require("../Image/dataicon/backicon.png")}
                style={{ width: 25, height: 25 }}
            />
        </TouchableOpacity>
        <View style={styles.header}>
          <Image
            source={{
              uri: profileData.avatar,
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Text style={styles.editIconText}>✏️</Text>
          </TouchableOpacity>
          <Text style={styles.username}>{profileData.username}</Text>
          <Text style={styles.position}>{profileData.position}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Your Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            editable={false}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={profileData.phone}
            editable={false}
          />

          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            value={profileData.website}
            editable={false}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={profileData.password}
            editable={false}
            secureTextEntry
          />
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
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
  editIcon: {
    position: "absolute",
    bottom: 50,
    right: 120,
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  editIconText: {
    fontSize: 14,
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
