import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ForgotPassword({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    passwordMismatch: false,
  });

  const handleResetPassword = async () => {
    const newErrors = {
      email: email === "",
      password: password === "",
      passwordMismatch: password !== passwordRepeat,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      setModalMessage("Please fill all fields correctly.");
      setModalVisible(true);
      return;
    }

    setModalMessage("Password reset successfully!");
    setModalVisible(true);
    setTimeout(() => navigation.navigate("Login"), 1500);
  };

  return (
    <View style={styles.container}>
      {/* Hình ảnh đầu trang */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../Image/login/resetpassword.png")}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>

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
        colors={["#dfe9f3", "#FFFEFF"]}
        style={styles.gradientBackground}
      >
        {/* Nội dung chính */}
        <View style={styles.contentContainer}>
          {/* Tiêu đề */}
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Please enter your email and new password
          </Text>

          {/* Input email */}
          <View style={styles.inputContainer}>
            <Image
              source={require("../Image/login/email.png")}
              style={styles.icon}
            />
            <TextInput
              placeholder={
                errors.email ? "Email is required" : "Enter your email"
              }
              style={[styles.input, errors.email && styles.errorInput]}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Input password */}
          <View style={styles.inputContainer}>
            <Image
              source={require("../Image/login/lock.png")}
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter new password"
              secureTextEntry={!isChecked2}
              style={[styles.input, errors.password && styles.errorInput]}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsChecked2(!isChecked2)}
              style={styles.eyeButton}
            >
              <Image
                source={require("../Image/login/eye.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Input repeat password */}
          <View style={styles.inputContainer}>
            <Image
              source={require("../Image/login/lock.png")}
              style={styles.icon}
            />
            <TextInput
              placeholder="Repeat new password"
              secureTextEntry={!isChecked}
              style={[
                styles.input,
                errors.passwordMismatch && styles.errorInput,
              ]}
              value={passwordRepeat}
              onChangeText={setPasswordRepeat}
            />
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              style={styles.eyeButton}
            >
              <Image
                source={require("../Image/login/eye.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {errors.passwordMismatch && (
            <Text style={styles.errorText}>Passwords do not match.</Text>
          )}

          {/* Nút reset password */}
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
          >
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Modal thông báo */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
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
  bannerImage: {
    width: "100%",
    height: 190,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 5,
  },
  inputContainer: {
    position: "relative",
    marginTop: 15,
  },
  icon: {
    position: "absolute",
    left: 15,
    top: 15,
    width: 20,
    height: 20,
  },
  input: {
    backgroundColor: "#f8f9fa",
    height: 50,
    borderRadius: 12,
    paddingLeft: 45,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e4e4e4",
  },
  errorInput: {
    borderColor: "red",
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  resetButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 300,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
