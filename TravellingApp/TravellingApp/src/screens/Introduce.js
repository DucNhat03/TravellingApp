import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const IntroduceScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [progress, setProgress] = useState(0); // Tiến độ loading

  const handleNavigate = () => {
    setLoading(true); // Bật loading
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setLoading(false); // Tắt loading
        navigation.navigate("Login"); // Chuyển sang màn hình Login
      }
    }, 200); // Tăng tiến độ mỗi 200ms
  };

  return (
    <LinearGradient
      colors={["#243949", "#517fa4"]} // Nền gradient
      style={styles.container}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>{progress}%</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Travel Booking App</Text>
          <TouchableOpacity onPress={handleNavigate}>
            <Image
              source={require("../Image/Introduce/logoApp.png")}
              style={styles.Introduce}
            />
          </TouchableOpacity>
          <Text style={styles.subtitle}>
            Let’s make your journey extraordinary.
          </Text>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 36, // Tăng kích thước chữ
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.6)", // Bóng chữ tối
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1, // Thêm khoảng cách giữa các ký tự
  },
  Introduce: {
    width: 160, // Tăng kích thước logo
    height: 160,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "rgba(0, 0, 0, 0.5)", // Bóng của logo
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Hiệu ứng ánh sáng nền cho logo
    elevation: 10, // Nổi bật hơn trên Android
  },
  subtitle: {
    fontSize: 18, // Tăng kích thước phụ đề
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.6)", // Bóng chữ tối hơn
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 0.5, // Tăng khoảng cách giữa các ký tự
    lineHeight: 24, // Cải thiện khoảng cách giữa các dòng
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 24,
    color: "#fff",
    marginTop: 10,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.6)", // Bóng chữ
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default IntroduceScreen;
