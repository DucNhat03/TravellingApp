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
            navigation.navigate("AdminHome", { profile: userData });
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
      {/* Modal hiển thị thông báo */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
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

      {/* Back button */}
      <View style={{ width: "100%" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../Image/dataicon/backicon.png")}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>

      {/* Header image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../Image/homescreen/ApartmentinOmaha.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>

      {/* Form container */}
      <View style={styles.formContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>
        </View>

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
            style={[
              styles.input,
              { borderColor: errors.email ? "red" : "#EEEEEE" },
            ]}
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && (
            <Text style={styles.errorText}>Please enter your email.</Text>
          )}
        </View>

        {/* Input password */}
        <View style={styles.inputContainer}>
          <Image
            source={require("../Image/login/lock.png")}
            style={styles.icon}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsChecked3(!isChecked3)}
          >
            <Image
              source={require("../Image/login/eye.png")}
              style={[
                styles.eyeIcon,
                { transform: [{ rotate: isChecked3 ? "0deg" : "180deg" }] },
              ]}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={
              errors.password ? "Password is required" : "Enter your password"
            }
            secureTextEntry={!isChecked3}
            style={[
              styles.input,
              { borderColor: errors.password ? "red" : "#EEEEEE" },
            ]}
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && (
            <Text style={styles.errorText}>Please enter your password.</Text>
          )}
        </View>

        {/* Error invalid login */}
        {errors.invalidLogin && (
          <Text style={styles.errorText}>
            Incorrect email or password. Please try again.
          </Text>
        )}

        {/* Forgot password link */}
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 20,
    width: 25,
    height: 25,
    paddingBottom: 10,
  },
  imageContainer: {
    width: "90%",
    alignItems: "center",
    marginTop: 30,
    borderWidth: 5,
    borderRadius: 35,
    borderColor: "#fff",
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: 220,
    borderRadius: 30,
    padding: 5,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "white",
    height: 800,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  welcomeContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 15,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginLeft: 10,
    marginTop: 23,
    position: "absolute",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  eyeIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    right: 20,
    top: 8,
  },
  input: {
    backgroundColor: "#EEEEEE",
    height: 50,
    borderColor: "#EEEEEE",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    width: "95%",
    fontSize: 18,
    paddingLeft: 50,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
    marginTop: -15,
    marginBottom: 10,
  },
  forgotPasswordContainer: {
    width: "95%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#33CCFF",
  },
  loginButtonContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  loginButton: {
    backgroundColor: "#33CCFF",
    borderRadius: 10,
    width: "95%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
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
    borderRadius: 10,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#33CCFF",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
