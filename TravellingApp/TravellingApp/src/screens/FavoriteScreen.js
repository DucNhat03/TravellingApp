import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import Hoverable from "react-native-hoverable";
import { useFocusEffect } from "@react-navigation/native";

const FavoritesScreen = ({ route, navigation }) => {
  const [favorites, setFavorites] = useState(route.params?.favorites || []);
  const [selectedFooter, setSelectedFooter] = useState("Favorites");

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.favorites) {
        setFavorites(route.params.favorites);
      }
    }, [route.params?.favorites])
  );

  const handleGoBack = () => {
    navigation.navigate("Home", { favorites });
  };

  const handleProductDetail = (product) => {
    navigation.navigate("DetailScreen", { product });
  };
  {
    /* Hàm để xóa tất cả yêu thích */
  }
  const handleClearFavorites = () => {
    setFavorites([]);
    navigation.navigate("Home", { favorites: [] });
  };

  const handleFavorite = () => {
    setSelectedFooter("Favorites");
    navigation.navigate("Favorites", {
      favorites: route.params.favorites,
    });
  };

  const handleInbox = () => {
    setSelectedFooter("Inbox");
    navigation.navigate("InboxScreen");
  };

  const handleProfile = () => {
    setSelectedFooter("Profile");
    navigation.navigate("ProfileScreen");
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                handleGoBack();
              }}
            >
              <Image
                source={require("../Image/dataicon/backicon.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Favorites</Text>
            <TouchableOpacity
              onPress={() => {
                handleClearFavorites();
              }}
            >
              <Image
                source={require("../Image/dataicon/more.png")}
                style={styles.moreIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Navigation */}
          <View style={styles.navigation}>
            <Text style={styles.textNav}>Places you liked</Text>
          </View>

          {/* Sản phẩm yêu thích */}
          {favorites.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.product}
              onPress={() => handleProductDetail(product)}
            >
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productLine1}>
                <Text style={styles.titleProduct}>{product.name}</Text>
                <View style={styles.rate}>
                  <Image
                    source={require("../Image/homescreen/icon/star.png")}
                    style={styles.starIcon}
                  />
                  <Text style={styles.textRate}>{product.rating}</Text>
                </View>
              </View>
              <View style={styles.productLine2}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../Image/dataicon/singlebed.png")}
                    style={styles.bedIcon}
                  />
                  <Text style={styles.type}>1 bedroom</Text>
                </View>
                <View style={styles.rate}>
                  <Text style={styles.textPrice}>${product.price}</Text>
                  <Text style={styles.textRate}>/night</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/*Footer*/}
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
              action: handleFavorite,
            },
            {
              label: "Bookings",
              icon: require("../Image/homescreen/icon/application.png"),
              action: () => setSelectedFooter("Bookings"),
            },
            {
              label: "Inbox",
              icon: require("../Image/dataicon/chat.png"),
              action: handleInbox,
            },
            {
              label: "Profile",
              icon: require("../Image/dataicon/usericon.png"),
              action: handleProfile,
            },
          ].map((item, index) => (
            <Hoverable
              key={index}
              onHoverIn={() => setSelectedFooter(item.label)}
            >
              {(isHovered) => (
                <View style={styles.footerItemContainer}>
                  <TouchableOpacity
                    style={styles.footerItem}
                    onPress={item.action}
                  >
                    <Image
                      source={item.icon}
                      style={[
                        styles.footerIcon,
                        selectedFooter === item.label &&
                          styles.activeFooterIcon, // Chỉ xét selectedFooter
                      ]}
                    />
                    <Text
                      style={[
                        styles.textFooter,
                        selectedFooter === item.label
                          ? styles.activeFooterText
                          : styles.textFooter,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Hoverable>
          ))}
        </View>
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
    height: 700,
  },
  scrollContainer: {
    width: "100%",
    flex: 1,
    height: 400,
    paddingBottom: 50,
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
  },
  navigation: {
    width: "100%",
    height: 50,
    flexDirection: "row",
  },
  textNav: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  product: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    marginTop: 5,
  },
  productImage: {
    width: "95%",
    height: 300,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  productImageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  starIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  productLine1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 10,
  },
  productLine2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 10,
  },
  rate: {
    flexDirection: "row",
    alignItems: "center",
  },
  textRate: {
    marginLeft: 3,
  },
  titleProduct: {
    fontSize: 16,
    fontWeight: "bold",
  },
  type: {
    fontSize: 14,
    opacity: 0.6,
  },
  textPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    position: "fixed",
    bottom: 0,
    zIndex: 100,
    paddingHorizontal: 8,
  },
  footerItem: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  footerIcon: {
    width: 27,
    height: 27,
    resizeMode: "contain",
    tintColor: "#000", // Màu mặc định của icon
  },
  footerItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textFooter: {
    fontSize: 12,
    color: "#000", // Màu mặc định của chữ
  },
  activeFooterIcon: {
    tintColor: "#00BFFF", // Màu xanh khi được chọn
  },
  activeFooterText: {
    color: "#00BFFF", // Màu xanh khi được chọn
  },
  bedIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    opacity: 0.6,
  },
});
export default FavoritesScreen;

{
  /*
  Phần này là phần icon yêu thích ở mỗi sản phẩm
  <TouchableOpacity style={styles.productImageContainer}>
                <View
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: "#fff",
                    position: "absolute",
                    zIndex: 1000,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    top: -290,
                    right: 20,
                  }}
                >
                  <Image
                    source={require("../Image/homescreen/icon/favourite.png")}
                    style={{ width: 25, height: 25, resizeMode: "contain" }}
                  />
                </View>
              </TouchableOpacity>
  
*/
}
