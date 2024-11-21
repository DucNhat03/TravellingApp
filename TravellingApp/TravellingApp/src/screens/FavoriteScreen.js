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
import { useFocusEffect } from "@react-navigation/native";

const FavoritesScreen = ({ route, navigation }) => {
  const [favorites, setFavorites] = useState(route.params?.favorites || []);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.favorites) {
        setFavorites(route.params.favorites);
      }
    }, [route.params?.favorites])
  );

  const handleGoBack = () => {
    if (route.params?.onUpdateFavorites) {
      route.params.onUpdateFavorites(favorites);
    }
    navigation.goBack();
  };
  

  const handleProductDetail = (product) => {
    navigation.navigate("DetailScreen", { product });
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    if (route.params?.onUpdateFavorites) {
      route.params.onUpdateFavorites([]);
    }
    navigation.goBack();
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
    paddingBottom: 20,
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
});

export default FavoritesScreen;
