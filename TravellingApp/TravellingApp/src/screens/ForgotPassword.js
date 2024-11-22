import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";

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

    try {
      const response = await axios.patch(`http://localhost:3000/users`, {
        email,
        password,
      });

      if (response.status === 200) {
        setModalMessage("Password has been updated successfully!");
        setModalVisible(true);
        setTimeout(() => navigation.navigate("Login"), 1500);
      }
    } catch (error) {
      setModalMessage("An error occurred. Check the email or try again.");
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../Image/dataicon/backicon.png")}
            style={{ marginLeft: 20, marginTop: 20, width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={require("../Image/login/resetpassword.png")}
            style={{ width: 120, height: 120, borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Reset Password</Text>
          <Text style={{ fontSize: 15, opacity: 0.6 }}>Reset your password</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={errors.email ? "Email is required" : "Enter your email"}
            style={[
              styles.input,
              { borderColor: errors.email ? "red" : "#EEEEEE" },
            ]}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter new password"
            secureTextEntry={!isChecked2}
            style={[
              styles.input,
              { borderColor: errors.password ? "red" : "#EEEEEE" },
            ]}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsChecked2(!isChecked2)}
            style={styles.eyeButton}
          >
            <Image
              source={require("../Image/login/eye.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Repeat new password"
            secureTextEntry={!isChecked}
            style={[
              styles.input,
              {
                borderColor: errors.passwordMismatch ? "red" : "#EEEEEE",
              },
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
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>

        {errors.passwordMismatch && (
          <Text style={styles.errorText}>Passwords do not match.</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
          >
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  formContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F9F9F9",
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 10,
    borderColor: "#D3D3D3",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  buttonContainer: {
    marginTop: 25,
  },
  resetButton: {
    backgroundColor: "#33CCFF",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 20,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
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
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#33CCFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
