import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function AdminHome({ navigation, route }) {
  const username = route.params?.username || "Admin";
  const fadeAnim = useRef(new Animated.Value(0)).current; // Dùng để fade-in
  const slideAnim = useRef(new Animated.Value(50)).current; // Dùng để slide-in từ dưới

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim, // Điều chỉnh độ mờ
          },
        ]}
      >
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/020/429/953/non_2x/admin-icon-vector.jpg",
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>Welcome, {username}</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <MaterialIcons name="logout" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Dashboard Options */}
      <Animated.View
        style={[
          styles.dashboard,
          {
            transform: [{ translateY: slideAnim }], // Hiệu ứng slide-in
          },
        ]}
      >
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("AdminProductManagement", { username })
          }
        >
          <MaterialIcons name="inventory" size={40} color="#007bff" />
          <Text style={styles.cardText}>Manage Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AdminUserManagement")}
        >
          <MaterialIcons name="people" size={40} color="#007bff" />
          <Text style={styles.cardText}>Manage Users</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  dashboard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
});
