import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";

const InboxDetailScreen = ({ route, navigation }) => {
  const { sender, avatar, conversationId } = route.params;
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3000/conversations/${conversationId}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
  
    const newMessage = {
      sender: "You",
      message: inputMessage,
      conversation_id: conversationId,
    };
  
    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
  
      if (response.ok) {
        fetchMessages(); // Làm mới danh sách tin nhắn
        setInputMessage("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../Image/dataicon/backicon.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>{sender}</Text>
        <Image source={{ uri: avatar }} style={styles.avatarHeader} />
      </View>

      <ScrollView style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageWrapper,
              msg.sender === "You" ? styles.outgoingWrapper : styles.incomingWrapper,
            ]}
          >
            <View style={styles.messageBubble}>
              <Text>{msg.message}</Text>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your message..."
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Image
            source={require("../Image/dataicon/sendicon.png")}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "500",
  },
  avatarHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFC0CB'
  },
  messageWrapper: {
    marginVertical: 5,
  },
  outgoingWrapper: {
    alignItems: "flex-end",
  },
  incomingWrapper: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FF1493',
  },
  messageText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  outgoingText: {
    color: "#fff", // Màu chữ cho tin nhắn gửi đi
  },
  messageTime: {
    fontSize: 12,
    color: "#E0FFFF",
    marginTop: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default InboxDetailScreen;
