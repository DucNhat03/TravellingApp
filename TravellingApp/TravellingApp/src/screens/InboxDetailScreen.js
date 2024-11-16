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
import Hoverable from "react-native-hoverable";

const InboxDetailScreen = ({ route, navigation }) => {
  const { sender, avatar, messagesHistory, updateMessages } = route.params;
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(messagesHistory || []);

  const handleBack = () => {
    updateMessages(messages); // Cập nhật tin nhắn mới về màn hình cha
    navigation.goBack();
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), sender: "You", message: inputMessage, time: "Now" },
    ]);
    setInputMessage("");
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      {/* Các thành phần khác */}
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require("../Image/dataicon/backicon.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>{sender}</Text>
          <Image source={avatar} style={styles.avatarHeader} />
        </View>

        {/* Nội dung khác */}
        <ScrollView style={styles.messageContainer}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.sender === "You" ? styles.outgoing : styles.incoming,
              ]}
            >
              <Text style={styles.messageText}>{msg.message}</Text>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
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
    </View>
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
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  incoming: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  outgoing: {
    alignSelf: "flex-end",
    backgroundColor: "#d1edc1",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
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
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#f8f8f8",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerItemContainer: {
    alignItems: "center",
  },
  footerItem: {
    alignItems: "center",
  },
  footerIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  textFooter: {
    fontSize: 12,
  },
});

export default InboxDetailScreen;

{
  /*
Footer 
<View style={styles.footer}>
{[
  {
    label: "Search",
    icon: require("../Image/dataicon/search.png"),
    action: () => navigation.navigate("HomeScreen"),
  },
  {
    label: "Favorites",
    icon: require("../Image/homescreen/icon/favourite.png"),
    action: () => navigation.navigate("Favorites"),
  },
  {
    label: "Bookings",
    icon: require("../Image/homescreen/icon/application.png"),
    action: () => navigation.navigate("BookingsScreen"),
  },
  {
    label: "Inbox",
    icon: require("../Image/dataicon/chat.png"),
    action: () => navigation.navigate("InboxScreen"),
  },
  {
    label: "Profile",
    icon: require("../Image/dataicon/usericon.png"),
    action: () => navigation.navigate("ProfileScreen"),
  },
].map((item, index) => (
  <Hoverable
    key={index}
    onHoverIn={() => {}}
  >
    <View style={styles.footerItemContainer}>
      <TouchableOpacity style={styles.footerItem} onPress={item.action}>
        <Image
          source={item.icon}
          style={styles.footerIcon}
        />
        <Text style={styles.textFooter}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  </Hoverable>
))}
</View>    
*/
}
