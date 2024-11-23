import React, { useState, useEffect } from "react";
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UpdateUserModal from "../component/UpdateUserModal";

export default function AdminUserManagement({ navigation, route }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const username = route.params?.username || "Admin";

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setModalMessage("Error fetching users.");
      setModalVisible(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers().finally(() => setRefreshing(false));
  };

  const showModal = (message, action = null) => {
    setModalMessage(message);
    setConfirmAction(action);
    setModalVisible(true);
  };

  const handleConfirmAction = () => {
    if (confirmAction) confirmAction();
    setModalVisible(false);
  };

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update user");

      alert("User updated successfully.");
      fetchUsers(); // Làm mới danh sách user sau khi cập nhật
    } catch (error) {
      alert("Failed to update user.");
    }
  };

  const deleteUser = (id) => {
    showModal("Are you sure you want to delete this user?", async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/deleteAccount?userId=${id}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Failed to delete user");

        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        showModal("User deleted successfully.");
      } catch (error) {
        showModal("Failed to delete user.");
      }
    });
  };

  const updateUser = (userId) => {
    setSelectedUser(userId); // Chỉ lưu ID của user
    setUpdateModalVisible(true);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <View style={styles.container}>
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
        <Text style={styles.title}>Manage Users</Text>

        {/* Search and Refresh */}
        <View style={styles.searchandRefresh}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="  Search users..."
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

        {/* User List */}
        <View style={styles.userListContainer}>
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <View style={styles.userInfo}>
                  <Text style={styles.userEmail}>{item.email}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => updateUser(item.id)}
                  >
                    <MaterialIcons name="edit" size={20} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => deleteUser(item.id)}
                  >
                    <MaterialIcons name="delete" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {/* Confirmation Modal */}
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
                {confirmAction && (
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={handleConfirmAction}
                  >
                    <Text style={styles.modalButtonText}>Confirm</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
        {/* Update User Modal */}
        <UpdateUserModal
          visible={isUpdateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
          userId={selectedUser} // Truyền ID của user
          onSave={handleUpdateUser} // Hàm xử lý lưu thông tin user
        />
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
  },
  searchContainer: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
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
  userListContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  userItem: {
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
  userEmail: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalMessage: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
  },
  confirmButton: {
    backgroundColor: "#28a745",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
});
