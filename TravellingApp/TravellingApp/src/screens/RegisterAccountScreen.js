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
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false); // Trạng thái loading khi đăng ký
  const [successVisible, setSuccessVisible] = useState(false); // Hiển thị hiệu ứng thành công

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
      setModalMessage("Vui lòng điền đầy đủ thông tin.");
      setModalVisible(true);
      return;
    }

    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.post("http://localhost:3000/register", {
        phone_number: phoneNumber,
        country_code: countryCode,
        username,
        email,
        password,
        avatar: avatar?.uri,
      });

      if (response.status === 201) {
        setSuccessVisible(true); // Hiển thị hiệu ứng thành công
        setTimeout(() => {
          setSuccessVisible(false);
          navigation.navigate("Login2"); // Chuyển sang màn hình đăng nhập
        }, 2000); // Hiệu ứng tồn tại 2 giây
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Đăng ký không thành công.";
      setModalMessage(errorMsg);
      setModalVisible(true);
    } finally {
      setLoading(false); // Tắt loading
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
              {loading ? (
                <ActivityIndicator size="large" color="#33CCFF" />
              ) : (
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
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Hiển thị hiệu ứng Thành Công */}
      {successVisible && (
        <View style={styles.successContainer}>
          <Image
            source={require("../Image/login/success.png")} // Đường dẫn hình ảnh thành công
            style={styles.successImage}
          />
          <Text style={styles.successText}>Đăng ký thành công!</Text>
        </View>
      )}
      {/* Modal hiển thị thông báo lỗi */}
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
    backgroundColor: "#F9F9F9",
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    width: "95%",
    fontSize: 18,
    paddingLeft: 50,
    borderRadius: 10,
    borderColor: "#D3D3D3", 
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
  successContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  successImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#33CCFF",
  },
});
