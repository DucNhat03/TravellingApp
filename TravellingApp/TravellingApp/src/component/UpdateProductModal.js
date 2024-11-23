import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

const UpdateProductModal = ({ visible, onClose, productId, onSave }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await fetch(`http://localhost:3000/products/${productId}`);
          if (!response.ok) throw new Error("Failed to fetch product data");
          const data = await response.json();
          setName(data.name || "");
          setCategory(data.category || "");
          setPrice(data.price.toString() || "");
          setRating(data.rating.toString() || "");
          setImageUrl(data.image_url || "");
          setDescription(data.description || "");
        } catch (error) {
          console.error("Error fetching product data:", error.message);
        }
      }
    };

    if (visible) {
      fetchProduct(); // Gọi API khi modal mở
    }
  }, [productId, visible]);

  const handleSave = () => {
    if (!name || !category || !price) {
      alert("Please fill in all required fields.");
      return;
    }

    const updatedProduct = {
      name,
      category,
      price: parseFloat(price),
      rating: parseFloat(rating) || 0,
      image_url: imageUrl,
      description,
    };

    onSave(productId, updatedProduct); // Gửi ID và dữ liệu cập nhật qua `onSave`
    onClose(); // Đóng modal
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Product</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Rating"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UpdateProductModal;
