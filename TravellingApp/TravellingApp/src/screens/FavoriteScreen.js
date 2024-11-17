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
  Alert,
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

  const handleClearFavorites = () => {
    setFavorites([]);
    navigation.navigate("Home", { favorites: [] });
  };

  const handleFavorite = () => {
    setSelectedFooter("Favorites");
    navigation.navigate("Favorites", {
      favorites,
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
            <TouchableOpacity onPress={handleGoBack}>
              <Image
                source={require("../Image/dataicon/backicon.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Favorites</Text>
            <TouchableOpacity onPress={handleClearFavorites}>
              <Image
                source={require("../Image/dataicon/clear.png")}
                style={styles.moreIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Navigation */}
          <View style={styles.navigation}>
            <Text style={styles.textNav}>Places you liked</Text>
          </View>

          {/* Sản phẩm yêu thích */}
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.product}
                onPress={() => handleProductDetail(product)}
              >
                <Image
                  source={{ uri: product.image_url }}
                  style={styles.productImage}
                />
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
                  <Text style={styles.type}>{product.category}</Text>
                  <View style={styles.rate}>
                    <Text style={styles.textPrice}>${product.price}</Text>
                    <Text style={styles.textRate}>/night</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noFavoritesText}>No favorites added yet.</Text>
          )}
        </ScrollView>

        {/* Footer */}
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
            <Hoverable key={index}>
              <View style={styles.footerItemContainer}>
                <TouchableOpacity style={styles.footerItem} onPress={item.action}>
                  <Image
                    source={item.icon}
                    style={[
                      styles.footerIcon,
                      selectedFooter === item.label && styles.activeFooterIcon,
                    ]}
                  />
                  <Text
                    style={[
                      styles.textFooter,
                      selectedFooter === item.label && styles.activeFooterText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              </View>
            </Hoverable>
          ))}
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
  scrollContainer: {
    flex: 1,
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
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  navigation: {
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "center",
  },
  textNav: {
    fontSize: 24,
    fontWeight: "bold",
  },
  product: {
    width: "100%",
    height: 400,
    alignItems: "center",
    marginTop: 5,
  },
  productImage: {
    width: "95%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
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
  noFavoritesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  footer: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
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
    tintColor: "#000",
  },
  footerItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textFooter: {
    fontSize: 12,
    color: "#000",
  },
  activeFooterIcon: {
    tintColor: "#00BFFF",
  },
  activeFooterText: {
    color: "#00BFFF",
  },
});

export default FavoritesScreen;
