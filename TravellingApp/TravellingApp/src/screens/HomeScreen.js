import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-web";
import Hoverable from "react-native-hoverable";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ route, navigation }) => {
  const [selectedNav, setSelectedNav] = useState(0); // 0: mặc định mục đầu tiên được chọn
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedFooter, setSelectedFooter] = useState("Search");
  const [profileData, setProfileData] = useState(null);
  const [messages, setMessages] = useState([]);

  const categories = ["Beach", "Mountain", "Camping"];

  //nhan du lieu user
  useEffect(() => {
  if (route.params?.profile) {
    console.log("Received profile in HomeScreen:", route.params.profile);
    setProfileData(route.params.profile.user); // Lưu user vào profileData
  } else {
    console.log("No profile data received");
  }
  fetchProducts();
}, [route.params?.profile]);
  


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const selectedCategory = categories[selectedNav];
    const filtered = products.filter(
      (item) =>
        item.category === selectedCategory &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [selectedNav, searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleProductDetail = (product) => {
    navigation.navigate("DetailScreen", { product });
  };

  const handleFavorite = () => {
    navigation.navigate("Favorites", {
      favorites,
      setFavorites,
    });
  };



  const handleProfile = () => {
      console.log("Navigating to ProfileScreen with userId:", profileData.id); // Log để kiểm tra
      navigation.navigate("ProfileScreen", { userId: profileData.id });
    
  };
  

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.updatedMessages) {
        setMessages(route.params.updatedMessages);
      }
    }, [route.params?.updatedMessages])
  );

  const handleInbox = () => {
    navigation.navigate("InboxScreen", {
      messages,
      setMessages,
    });
  };

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.find((item) => item.id === product.id)
        ? prevFavorites.filter((item) => item.id !== product.id)
        : [...prevFavorites, product];
      navigation.setParams({ favorites: updatedFavorites });
      return updatedFavorites;
    });
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.ScrollViewContainer}>
          <View style={styles.search}>
            <TouchableOpacity>
              <Image source={require("../Image/dataicon/search.png")} style={styles.searchIcon} />
            </TouchableOpacity>
            <TextInput
              placeholder="Where do you want stay?"
              style={styles.inputSeacrch}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
          <View style={styles.navigation}>
            {categories.map((category, index) => (
              <View
                key={index}
                style={[styles.navItem, selectedNav === index && styles.activeNav]}
              >
                <TouchableOpacity
                  style={styles.navButtonContainer}
                  onPress={() => setSelectedNav(index)}
                >
                  <Image
                    source={
                      category === "Beach"
                        ? require("../Image/homescreen/icon/cayduaa.png")
                        : category === "Mountain"
                        ? require("../Image/homescreen/icon/nuidoi.png")
                        : require("../Image/homescreen/icon/tupleu.png")
                    }
                    style={styles.navItemImage}
                  />
                  <Text style={{ fontSize: 12 }}>{category}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {filteredProducts.map((product) => (
            <View style={styles.product} key={product.id}>
              <TouchableOpacity
                style={styles.productImageContainer}
                onPress={() => handleProductDetail(product)}
              >
                <Image source={{ uri: product.image_url }} style={styles.productImage} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => toggleFavorite(product)}
              >
                <Image
                  source={
                    favorites.find((item) => item.id === product.id)
                      ? require("../Image/homescreen/icon/heart_filled.png")
                      : require("../Image/homescreen/icon/heart_outline.png")
                  }
                  style={styles.heartIcon}
                />
              </TouchableOpacity>
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
            </View>
          ))}
        </ScrollView>
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
              onPointerDown={() => setSelectedFooter(item.label)}
            >
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
                      selectedFooter === item.label
                        ? styles.activeFooterText
                        : styles.textFooter,
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
    width: "100%",
    margin: 0,
    padding: 0,
    backgroundColor: "#E0FFFF",
  },
  ScrollViewContainer: {
    backgroundColor: "#fff",
    paddingBottom: 70,
  },
  search: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    position: "absolute",
    top: -8,
    left: 10,
  },
  inputSeacrch: {
    width: "95%",
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingLeft: 40,
    objectFit: true,
  },
  favoriteIcon: {
    position: "absolute",
    top: 35,
    right: 25,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#fff",
  },
  heartIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  navigation: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  navItem: {
    width: 80,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeNav: {
    borderBottomWidth: 2,
    borderBottomColor: "#00BFFF",
  },
  navItemImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  product: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
    opacity: 0.8,
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
});

export default HomeScreen;
