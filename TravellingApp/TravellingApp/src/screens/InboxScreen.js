import React, { useState, useEffect } from "react";
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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch("http://localhost:3000/conversations");
      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
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
        <Text style={styles.textHeader}>Inbox</Text>
      </View>


      <ScrollView style={styles.scrollContainer}>
        {messages.map((msg) => (
          <TouchableOpacity
            key={msg.id}
            style={styles.messageItem}
            onPress={() =>
              navigation.navigate("InboxDetailScreen", {
                sender: msg.sender_name,
                avatar: msg.avatar_url,
                conversationId: msg.id,
              })
            }
          >
            <Image source={{ uri: msg.avatar_url }} style={styles.avatar} />
            <View style={styles.messageContent}>
              <Text style={styles.sender}>{msg.sender_name}</Text>
              <Text style={styles.subject}>{msg.subject}</Text>
              <Text style={styles.preview}>{msg.latest_message}</Text>
            </View>
            <Text style={styles.time}>{msg.latest_time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    alignItems: "center",
    marginLeft: 10,
    textAlign: "center",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: '40%',
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
