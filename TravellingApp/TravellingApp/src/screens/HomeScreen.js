import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-web";
import { useFocusEffect } from "@react-navigation/native"; 

const HomeScreen = ({ route, navigation }) => {
  const [selectedNav, setSelectedNav] = useState(0); // 0: mặc định mục đầu tiên được chọn
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedFooter, setSelectedFooter] = useState("Search");

  const data = [
    {
      id: 1,
      name: "Apartment Luxury 1",
      category: "Beach",
      price: 28,
      rating: 5.0,
      image: require("../Image/homescreen/ApartmentinOmaha.png"),
    },
    {
      id: 2,
      name: "Mountain Luxury 1",
      category: "Mountain",
      price: 35,
      rating: 4.8,
      image: require("../Image/homescreen/Mountain.png"),
    },
    {
      id: 3,
      name: "Camping Tent",
      category: "Camping",
      price: 15,
      rating: 4.5,
      image: require("../Image/homescreen/camping.png"),
    },
    {
      id: 4,
      name: "Apartment View Beaches",
      category: "Beach",
      price: 28,
      rating: 5.0,
      image: require("../Image/homescreen/Beach.png"),
    },
    {
      id: 5,
      name: "Mountain Luxury 2",
      category: "Mountain",
      price: 35,
      rating: 4.8,
      image: require("../Image/homescreen/Mountain.png"),
    },
    {
      id: 6,
      name: "Camping Tent 2",
      category: "Camping",
      price: 15,
      rating: 4.5,
      image: require("../Image/homescreen/camping.png"),
    },
    {
      id: 7,
      name: "Apartment Luxury View Beaches",
      category: "Beach",
      price: 28,
      rating: 5.0,
      image: require("../Image/homescreen/ApartmentinOmaha.png"),
    },
    {
      id: 8,
      name: "Mountain Luxury 3",
      category: "Mountain",
      price: 35,
      rating: 4.8,
      image: require("../Image/homescreen/Mountain.png"),
    },
    {
      id: 9,
      name: "Camping Luxury 3",
      category: "Camping",
      price: 15,
      rating: 4.5,
      image: require("../Image/homescreen/camping.png"),
    },
    {
      id: 10,
      name: "Apartment Luxury 2",
      category: "Beach",
      price: 28,
      rating: 5.0,
      image: require("../Image/homescreen/Beach.png"),
    },
    {
      id: 11,
      name: "Mountain Luxury 4",
      category: "Mountain",
      price: 35,
      rating: 4.8,
      image: require("../Image/homescreen/Mountain.png"),
    },
    {
      id: 12,
      name: "Camping Tent 4",
      category: "Camping",
      price: 15,
      rating: 4.5,
      image: require("../Image/homescreen/camping.png"),
    },
    // Thêm sản phẩm khác nếu cần
  ];

  const categories = ["Beach", "Mountain", "Camping"];

  {/* Set selected khi nhận param tu Favorite Screen */}
  useEffect(() => {
    if (route.params?.selectedFooter) {
      setSelectedFooter(route.params.selectedFooter);
    }
  }, [route.params?.selectedFooter]);

  useEffect(() => {
    const selectedCategory = categories[selectedNav];
    const filtered = data.filter(
      (item) =>
        item.category === selectedCategory &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [selectedNav, searchQuery]);

  const handleProductDetail = (product) => {
    navigation.navigate("DetailScreen", { product });
  };

  const handleFavorite = () => {
    navigation.navigate("Favorites", {
      favorites,
      setFavorites, // setFavorites để cập nhật từ FavoritesScreen
    });
  };

  const handleProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleInbox = () => {
    navigation.navigate("InboxScreen");
  };

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((item) => item.id === product.id)) {
        return prevFavorites.filter((item) => item.id !== product.id); // Xóa khỏi danh sách
      } else {
        return [...prevFavorites, product]; // Thêm vào danh sách
      }
    });
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.ScrollViewContainer}>
          {/* Search */}
          <View style={styles.search}>
            <TouchableOpacity>
              <Image
                source={require("../Image/dataicon/search.png")}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Where do you want stay?"
              style={styles.inputSeacrch}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
          {/*Navigation*/}
          <View style={styles.navigation}>
            {categories.map((category, index) => (
              <View
                key={index}
                style={[
                  styles.navItem,
                  selectedNav === index && styles.activeNav,
                ]}
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

          {/*Products*/}
          {filteredProducts.map((product) => (
            <View style={styles.product} key={product.id}>
              <TouchableOpacity
                style={styles.productImageContainer}
                onPress={() => handleProductDetail(product)}
              >
                <Image source={product.image} style={styles.productImage} />
              </TouchableOpacity>

              {/* Icon yêu thích */}
              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => toggleFavorite(product)}
              >
                <Image
                  source={
                    favorites.find((item) => item.id === product.id)
                      ? require("../Image/homescreen/icon/heart_filled.png") // Trái tim đầy (màu đỏ)
                      : require("../Image/homescreen/icon/heart_outline.png") // Trái tim rỗng (màu trắng)
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
        {/*Footer*/}
        <View style={styles.footer}>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity
              style={styles.footerItem}
              onPress={() => {
                navigation.navigate("HomeScreen");
                setSelectedFooter("Search");
              }}
            >
              <Image
                source={require("../Image/dataicon/search.png")}
                style={[
                  styles.footerIcon,
                  selectedFooter === "Search" && styles.activeFooterIcon,
                ]}
              />
              <Text
                style={[
                  styles.textFooter,
                  selectedFooter === "Search" && styles.activeFooterText,
                ]}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity
              style={styles.footerItem}
              onPress={() => {
                setSelectedFooter("Favorites");
                handleFavorite();
              }}
            >
              <Image
                source={require("../Image/homescreen/icon/favourite.png")}
                style={[
                  styles.footerIcon,
                  selectedFooter === "Favorites" && styles.activeFooterIcon,
                ]}
              />
              <Text
                style={[
                  styles.textFooter,
                  selectedFooter === "Favorites" && styles.activeFooterText,
                ]}
              >
                Favorites
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity
              style={styles.footerItem}
              onPress={() => setSelectedFooter("Bookings")}
            >
              <Image
                source={require("../Image/homescreen/icon/application.png")}
                style={[
                  styles.footerIcon,
                  selectedFooter === "Bookings" && styles.activeFooterIcon,
                ]}
              />
              <Text
                style={[
                  styles.textFooter,
                  selectedFooter === "Bookings" && styles.activeFooterText,
                ]}
              >
                Bookings
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity
              style={styles.footerItem} 
              onPress={() => {setSelectedFooter("Inbox"), handleInbox()}}
            >
              <Image
                source={require("../Image/dataicon/chat.png")}
                style={[
                  styles.footerIcon,
                  selectedFooter === "Inbox" && styles.activeFooterIcon,
                ]}
              />
              <Text
                style={[
                  styles.textFooter,
                  selectedFooter === "Inbox" && styles.activeFooterText,
                ]}
              >
                Inbox
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity
              style={styles.footerItem}
              onPress={() => {
                setSelectedFooter("Profile");
                handleProfile();
              }}
            >
              <Image
                source={require("../Image/dataicon/usericon.png")}
                style={[
                  styles.footerIcon,
                  selectedFooter === "Profile" && styles.activeFooterIcon,
                ]}
              />
              <Text
                style={[
                  styles.textFooter,
                  selectedFooter === "Profile" && styles.activeFooterText,
                ]}
              >
                Profile
              </Text>
            </TouchableOpacity>
          </View>
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
