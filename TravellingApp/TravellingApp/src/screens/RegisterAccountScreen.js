import React, { useState } from "react";
import CheckBox from "react-native-check-box";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

export default function RegisterAccount({ navigation, route }) {
  const [isChecked, setIsChecked] = useState(false); // Checkbox đồng ý
  const [isChecked2, setIsChecked2] = useState(false); // Hiển thị mật khẩu
  const [username, setUsername] = useState(""); // Lưu username
  const [email, setEmail] = useState(""); // Lưu email
  const [password, setPassword] = useState(""); // Lưu password
  const [avatar, setAvatar] = useState(null); // Lưu ảnh đại diện
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái Modal
  const [modalMessage, setModalMessage] = useState(""); // Nội dung Modal

  const { phoneNumber, countryCode } = route.params;

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    checkbox: false,
  });

  const handleContinue = async () => {
    const newErrors = {
      username: username.trim() === "",
      email: email.trim() === "",
      password: password === "",
      checkbox: !isChecked,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      setModalMessage("Please fill all the required fields.");
      setModalVisible(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        phone_number: phoneNumber,
        country_code: countryCode,
        username,
        email,
        password,
        avatar: avatar?.uri, // Chuỗi base64
      });

      if (response.status === 201) {
        setModalMessage("Registration completed successfully!");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate("Login2");
        }, 1500);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Failed to register user.";
      setModalMessage(errorMsg);
      setModalVisible(true);
    }
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else {
          const selectedImage = response.assets[0];
          setAvatar(selectedImage); // Lưu ảnh đại diện vào state
          console.log("Avatar selected: ", selectedImage);
        }
      }
    );
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View style={{ width: "100%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../Image/dataicon/backicon.png")}
              style={{
                marginLeft: 20,
                marginTop: 20,
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ width: "100%" }}>
          <View
            style={{
              marginTop: 0,
              backgroundColor: "white",
              width: "100%",
              height: 600,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <View style={{ alignItems: "center", marginTop: 30 }}>
              <Image
                source={require("../Image/login/register.png")}
                style={{ width: 120, height: 90, borderRadius: 10 }}
                resizeMode="cover"
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                Nice to see you!!
              </Text>
              <Text style={{ fontSize: 15, opacity: 0.6 }}>
                Create your account
              </Text>
            </View>

            <View style={{ marginTop: 20, marginLeft: 20, borderRadius: 15 }}>
              <Image
                source={require("../Image/login/account.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  marginLeft: 10,
                  marginTop: 23,
                  position: "absolute",
                }}
              />
              <TextInput
                placeholder={
                  errors.username
                    ? "Username is required"
                    : "Enter your username"
                }
                style={[
                  styles.input,
                  { borderColor: errors.username ? "red" : "#EEEEEE" },
                ]}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={{ marginTop: 0, marginLeft: 20, borderRadius: 15 }}>
              <Image
                source={require("../Image/login/email.png")}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: "contain",
                  marginLeft: 10,
                  marginTop: 23,
                  position: "absolute",
                }}
              />
              <TextInput
                placeholder={
                  errors.email
                    ? "Email is required"
                    : "Enter your email address"
                }
                style={[
                  styles.input,
                  { borderColor: errors.email ? "red" : "#EEEEEE" },
                ]}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={{ marginTop: 0, marginLeft: 20, borderRadius: 15 }}>
              <Image
                source={require("../Image/login/lock.png")}
                style={{
                  width: 27,
                  height: 27,
                  resizeMode: "contain",
                  marginLeft: 10,
                  marginTop: 23,
                  position: "absolute",
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsChecked2(!isChecked2);
                }}
              >
                <Image
                  source={require("../Image/login/eye.png")}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: "contain",
                    right: 35,
                    marginTop: 23,
                    position: "absolute",
                    transform: [{ rotate: "180deg" }],
                  }}
                />
              </TouchableOpacity>

              <TextInput
                placeholder={
                  errors.password
                    ? "Password is required"
                    : "Enter your password"
                }
                secureTextEntry={!isChecked2}
                style={[
                  styles.input,
                  { borderColor: errors.password ? "red" : "#EEEEEE" },
                ]}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={{ marginTop: 10, marginLeft: 20, borderRadius: 15 }}>
              {/* Checkbox đồng ý điều khoản */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox
                  isChecked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                />
                <Text style={{ marginLeft: 10 }}>
                  I agree to the{" "}
                  <Text
                    style={{ color: "#33CCFF", fontWeight: "bold" }}
                    onPress={() => {
                      // Có thể mở một modal hoặc trang mới hiển thị điều khoản
                      console.log("Terms & Conditions clicked");
                    }}
                  >
                    Terms & Conditions
                  </Text>
                </Text>
              </View>
              {errors.checkbox && (
                <Text style={{ color: "red", marginTop: 5 }}>
                  You must agree to the Terms & Conditions
                </Text>
              )}
            </View>

            <View style={{ alignItems: "center", marginTop: 20 }}>
              {avatar ? (
                <Image
                  source={{ uri: avatar.uri }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <Image
                  source={require("../Image/login/upload.png")}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
              )}
              <TouchableOpacity onPress={selectImage}>
                <Text
                  style={{
                    color: "#33CCFF",
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  Upload Profile Picture
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 25, marginLeft: 20, paddingBottom: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#33CCFF",
                  borderRadius: 10,
                  width: "95%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleContinue}
              >
                <Text style={{ fontSize: 20, color: "white" }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  input: {
    backgroundColor: "#EEEEEE",
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    width: "95%",
    fontSize: 18,
    paddingLeft: 50,
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
