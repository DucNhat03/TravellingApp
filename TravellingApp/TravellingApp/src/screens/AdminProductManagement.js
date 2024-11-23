import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  RefreshControl,
  Image,
} from "react-native";
import AddProductModal from "../component/AddProductModal";
import { useFocusEffect } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UpdateProductModal from "../component/UpdateProductModal";

export default function AdminProductManagement({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false); // Modal cho menu header
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const username = route.params?.username || "Admin";
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false); // Xác định loại modal
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const openEditModal = (productId) => {
    setSelectedProductId(productId);
    setEditModalVisible(true);
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update product");

      alert("Product updated successfully.");
      fetchProducts(); // Làm mới danh sách sản phẩm
    } catch (error) {
      alert("Failed to update product.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      showModal("Error fetching products.");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts().finally(() => setRefreshing(false));
  };

  const showModal = (message, action) => {
    setModalMessage(message); // Đặt nội dung thông báo
    setConfirmAction(() => action); // Lưu callback để thực thi sau
    setModalVisible(true); // Hiển thị modal
  };

  const handleConfirmAction = () => {
    if (confirmAction) {
      confirmAction(); // Thực thi callback
    }
    setModalVisible(false); // Đóng modal sau xử lý
  };

  const deleteProduct = (id) => {
    showModal("Are you sure you want to delete this product?", async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete product");

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );

        // Sau khi xóa thành công
        alert("Product deleted successfully."); // Thay alert bằng modal thông báo nếu cần
      } catch (error) {
        alert("Failed to delete product."); // Thay alert bằng modal thông báo nếu cần
      }
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = async (newProduct) => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      showModal("Please fill in all required fields.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      const addedProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      showModal("Product added successfully.");
    } catch (error) {
      showModal("Failed to add product.");
    }
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <View style={styles.container}>
        {/* Header */}
        {/* Header */}
        <View style={styles.header}>
          {/* Menu Icon */}
          <TouchableOpacity onPress={() => setMenuModalVisible(true)}>
            <MaterialIcons name="menu" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Modal Menu */}
          <Modal
            visible={menuModalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.menuModalContainer}>
              <View style={styles.menuModalContent}>
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => {
                    setMenuModalVisible(false);
                    navigation.navigate("AdminHome"); // Chuyển về trang chính
                  }}
                >
                  <MaterialIcons name="home" size={20} color="#333" />
                  <Text style={styles.menuOptionText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => {
                    setMenuModalVisible(false);
                    navigation.navigate("Login"); // Chuyển về trang đăng nhập
                  }}
                >
                  <MaterialIcons name="logout" size={20} color="#333" />
                  <Text style={styles.menuOptionText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Username and Avatar */}
          <View style={styles.userInfo}>
            <Text style={styles.username}>Hi, {username}</Text>
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/020/429/953/non_2x/admin-icon-vector.jpg",
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Manage Products</Text>

        {/* Search Input */}
        <View style={styles.searchandRefresh}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="  Search products..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
          <View style={styles.refreshContainer}>
            <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
              <MaterialIcons name="refresh" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product List with Background */}
        <View style={styles.productListContainer}>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDetails}>
                    Category: {item.category} | Price: ${item.price}
                  </Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => openEditModal(item.id)}
                  >
                    <MaterialIcons name="edit" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => deleteProduct(item.id)}
                  >
                    <MaterialIcons name="delete" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        {/* Add Product Button */}
        <View style={{ paddingBottom: 20 }}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddModalVisible(true)}
          >
            <View style={styles.addButtonContent}>
              <MaterialIcons name="add-circle" size={24} color="#fff" />
              <Text style={styles.addButtonText}>Add Product</Text>
            </View>
          </TouchableOpacity>
        </View>

        <UpdateProductModal
          visible={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
          productId={selectedProductId}
          onSave={handleUpdateProduct}
        />

        {/* Add Product Modal */}
        <AddProductModal
          visible={isAddModalVisible}
          onClose={() => setAddModalVisible(false)}
          onSave={handleAddProduct}
          navigation={navigation}
        />

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={() => {
                    if (confirmAction) {
                      confirmAction(); // Thực thi hành động
                    }
                    setModalVisible(false); // Đóng modal sau khi xử lý
                  }}
                >
                  <Text style={styles.modalButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff", // Đồng bộ màu sắc
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
    textAlign: "center",
  },
  searchandRefresh: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  searchContainer: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  refreshContainer: {
    width: "15%",
    marginLeft: 10,
  },
  refreshButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    width: 40,
    height: 40,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  productListContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productDetails: {
    fontSize: 14,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: "#ffc107",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  menuModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ
  },
  menuModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuOptionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ
  },
  modalContent: {
    width: "80%", // Chiều rộng modal
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalMessage: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333", // Màu chữ
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Căn chỉnh nút
  },
  modalButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#dc3545", // Màu đỏ cho nút hủy
  },
  confirmButton: {
    backgroundColor: "#28a745", // Màu xanh cho nút xác nhận
  },
});
