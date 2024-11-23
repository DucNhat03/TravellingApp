import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
export default function AddProductModal({ visible, onClose, onSave }) {
  const navigation = useNavigation(); // Lấy đối tượng navigation từ context
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
    image_url: "",
    description: "",
  });
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const showNotification = (message) => {
    setNotificationMessage(message);
    setNotificationVisible(true);
  };

  const handleInputChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.rating ||
      !product.image_url
    ) {
      showNotification("Please fill in all required fields.");
      return;
    }
    onSave(product); // Gọi hàm lưu sản phẩm
    setProduct({
      name: "",
      category: "",
      price: "",
      rating: "",
      image_url: "",
      description: "",
    });
    showNotification("Product added successfully.");
    setTimeout(() => {
      onClose(); // Đóng modal
      navigation.navigate("AdminProductManagement"); // Điều hướng về màn hình quản lý sản phẩm
    }, 1500); // Thêm thời gian chờ ngắn để hiển thị thông báo
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        {/* Modal Thêm Sản Phẩm */}
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Product</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={product.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <Picker
              selectedValue={product.category}
              style={styles.picker}
              onValueChange={(itemValue) =>
                handleInputChange("category", itemValue)
              }
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Camping" value="Camping" />
              <Picker.Item label="Mountain" value="Mountain" />
              <Picker.Item label="Beach" value="Beach" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={product.price}
              onChangeText={(text) => handleInputChange("price", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating (0-5)"
              keyboardType="numeric"
              value={product.rating}
              onChangeText={(text) => handleInputChange("rating", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={product.image_url}
              onChangeText={(text) => handleInputChange("image_url", text)}
            />
            <TextInput
              style={styles.textArea}
              placeholder="Description"
              value={product.description}
              multiline
              numberOfLines={4}
              onChangeText={(text) => handleInputChange("description", text)}
            />
          </ScrollView>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal Thông Báo */}
        <Modal
          visible={notificationVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.notificationContainer}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationMessage}>
                {notificationMessage}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.okButton]}
                onPress={() => {
                  setNotificationVisible(false);
                  if (notificationMessage === "Product added successfully.") {
                    onClose(); // Đóng modal thêm sản phẩm và quay lại màn quản lý sản phẩm
                  }
                }}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "48%",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  okButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  notificationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  notificationContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  notificationMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});
