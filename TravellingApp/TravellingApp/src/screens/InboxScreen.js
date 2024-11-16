import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

const InboxScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      subject: "Booking Inquiry",
      message: "Hi, I have a question about my booking...",
      time: "10:30 AM",
      avatar: require("../Image/dataicon/homeicon.png"),
      messagesHistory: [
        {
          id: 1,
          sender: "John Doe",
          message: "Hi, I have a question about my booking...",
          time: "10:30 AM",
        },
        {
          id: 2,
          sender: "You",
          message: "Sure, how can I help?",
          time: "10:32 AM",
        },
      ],
    },
    {
      id: 2,
      sender: "Jane Smith",
      subject: "Payment Confirmation",
      message: "Your payment has been received. Thank you!",
      time: "9:15 AM",
      avatar: require("../Image/dataicon/face.png"),
      messagesHistory: [
        {
          id: 1,
          sender: "Jane Smith",
          message: "Your payment has been received. Thank you!",
          time: "9:15 AM",
        },
      ],
    },
    {
      id: 3,
      sender: "Host Support",
      subject: "Welcome to our service",
      message: "We are here to help you with your stay.",
      time: "Yesterday",
      avatar: require("../Image/dataicon/google.png"),
      messagesHistory: [
        {
          id: 1,
          sender: "Host Support",
          message: "We are here to help you with your stay.",
          time: "Yesterday",
        },
      ],
    },
  ]);

  const updateMessages = (id, newMessages) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, messagesHistory: newMessages } : msg
      )
    );
  };

  const handleNavigateToDetail = (msg) => {
    navigation.navigate("InboxDetailScreen", {
      sender: msg.sender,
      avatar: msg.avatar,
      messagesHistory: msg.messagesHistory || [
        {
          id: msg.id,
          sender: msg.sender,
          message: msg.message,
          time: msg.time,
        },
      ], // Đảm bảo có lịch sử tin nhắn
      updateMessages: (newMessages) => updateMessages(msg.id, newMessages), // Truyền hàm để cập nhật tin nhắn
    });
  };

  const handleBack = () => {
    if (route.params.updateMessages) {
      route.params.updateMessages(messages); // Cập nhật lịch sử tin nhắn
    }
    navigation.goBack();
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require("../Image/dataicon/backicon.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Inbox</Text>
          <TouchableOpacity>
            <Image
              source={require("../Image/dataicon/backicon.png")}
              style={styles.moreIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Message List */}
        <ScrollView style={styles.scrollContainer}>
          {messages.map((msg) => (
            <TouchableOpacity
              key={msg.id}
              style={styles.messageItem} // Dùng style cũ
              onPress={() =>
                navigation.navigate("InboxDetailScreen", {
                  sender: msg.sender,
                  avatar: msg.avatar,
                  messagesHistory: msg.messagesHistory,
                  updateMessages: (newMessages) =>
                    updateMessages(msg.id, newMessages),
                })
              }
            >
              <Image source={msg.avatar} style={styles.avatar} />
              <View style={styles.messageContent}>
                <Text style={styles.sender}>{msg.sender}</Text>
                <Text style={styles.subject}>{msg.subject}</Text>
                <Text style={styles.preview}>{msg.message}</Text>
              </View>
              <Text style={styles.time}>{msg.time}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    margin: 0,
    padding: 0,
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    width: "95%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "500",
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  moreIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    display: "none",
  },
  messageItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  sender: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subject: {
    fontSize: 14,
    color: "#666",
  },
  preview: {
    fontSize: 12,
    color: "#999",
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
});

export default InboxScreen;
