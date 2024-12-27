import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked3, setIsChecked3] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    invalidLogin: false,
  });

  const handleLogin = () => {
    const newErrors = {
      email: email === "",
      password: password === "",
      invalidLogin: false,
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    axios
      .post("http://localhost:3000/login", {
        email: trimmedEmail,
        password: trimmedPassword,
      })
      .then((response) => {
        const userData = response.data;

        if (userData.user && userData.user.role === "admin") {
          setModalMessage("Đăng nhập với tư cách Admin!");
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.navigate("AdminHome", {
              username: userData.user.username,
            });
          }, 1500);
        } else {
          setModalMessage("Đăng nhập thành công!");
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.navigate("Home", { profile: userData });
          }, 1500);
        }
      })
      .catch((error) => {
        setErrors((prevErrors) => ({ ...prevErrors, invalidLogin: true }));
        setModalMessage("Email hoặc mật khẩu không chính xác.");
        setModalVisible(true);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal thông báo */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
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

      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../Image/dataicon/backicon.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <LinearGradient
        colors={["#FFFEFF", "#dfe9f3"]}
        style={styles.gradientBackground}
      >
        {/* Hình ảnh tiêu đề */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../Image/login/banner.png")}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        {/* Form đăng nhập */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome to MyApp!</Text>

          {/* Nhập email */}
          <View style={styles.inputWrapper}>
            <Image
              source={require("../Image/login/email.png")}
              style={styles.iconEmail}
            />
            <TextInput
              placeholder={
                errors.email ? "Email is required" : "Enter your email"
              }
              style={[styles.input, errors.email && styles.inputError]}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Nhập mật khẩu */}
          <View style={styles.inputWrapper}>
            <Image
              source={require("../Image/login/lock.png")}
              style={styles.icon}
            />
            <TextInput
              placeholder={
                errors.password ? "Password is required" : "Enter your password"
              }
              secureTextEntry={!isChecked3}
              style={[styles.input, errors.password && styles.inputError]}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setIsChecked3(!isChecked3)}
            >
              <Image
                source={require("../Image/login/eye.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Lỗi đăng nhập */}
          {errors.invalidLogin && (
            <Text style={styles.errorText}>
              Email hoặc mật khẩu không chính xác.
            </Text>
          )}

          {/* Quên mật khẩu */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Nút đăng nhập */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 15,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: 0,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  iconEmail: {
    position: "absolute",
    left: 10,
    top: 15,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  icon: {
    position: "absolute",
    left: 10,
    top: 15,
    width: 20,
    height: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingLeft: 40,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "red",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "#007bff",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
