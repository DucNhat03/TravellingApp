import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const IntroduceScreen = ({ navigation }) => {
 
  return (
    <View style={styles.container}>
        <TouchableOpacity >
            <Image
                source={require("../Image/Introduce/logoApp.png")}
                style={styles.Introduce}
            />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FFFAFA',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    Introduce: {
        width: 140,
        height: 140,
        resizeMode: 'contain'
    },
});

export default IntroduceScreen;
