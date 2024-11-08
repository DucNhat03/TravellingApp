import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-web";

const HomeScreen = ({ navigation }) => {
  const [selectedNav, setSelectedNav] = useState(0); // 0: mặc định mục đầu tiên được chọn
  const handleFavorite = () => {
    navigation.navigate('Favorites');
  };

  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.ScrollViewContainer}>
          {/*Search*/}
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
            ></TextInput>
          </View>
          {/*Navigation*/}
          <View style={styles.navigation}>
            <View style={[styles.navItem,selectedNav === 0 && styles.activeNav,]}>
              <TouchableOpacity
                style={styles.navButtonContainer}
                onPress={() => setSelectedNav(0)} // item đầu tiên
              >
                <Image
                  source={require("../Image/homescreen/icon/cayduaa.png")}
                  style={styles.navItemImage}
                />
                <Text style={{fontSize: 12}}>Beach</Text>
              </TouchableOpacity>
              
            </View>
            <View style={[styles.navItem,selectedNav === 1 && styles.activeNav,]}>
              <TouchableOpacity
                style={styles.navButtonContainer}
                onPress={() => setSelectedNav(1)} 
              >
                <Image
                  source={require("../Image/homescreen/icon/nuidoi.png")}
                  style={styles.navItemImage}
                />
                <Text style={{fontSize: 12}}>Mountain</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.navItem,selectedNav === 2 && styles.activeNav,]}>
              <TouchableOpacity
                style={styles.navButtonContainer}
                onPress={() => setSelectedNav(2)} 
              >
                <Image
                  source={require("../Image/homescreen/icon/tupleu.png")}
                  style={styles.navItemImage}
                />
                <Text style={{fontSize: 12}}>Camping</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/*Product 1 */}
          <View style={styles.product}>
            <TouchableOpacity style={styles.productImageContainer}>
              <Image
                source={require("../Image/homescreen/ApartmentinOmaha.png")}
                style={styles.productImage}
              />
            </TouchableOpacity>
            <View style={styles.productLine1}>
              <Text style={styles.titleProduct}>Apartment in Omaha</Text>
              <View style={styles.rate}>
                <Image
                  source={require("../Image/homescreen/icon/star.png")}
                  style={styles.starIcon}
                />
                <Text style={styles.textRate}>5.0</Text>
              </View>
            </View>
            <View style={styles.productLine2}>
              <Text style={styles.type}>Beach</Text>
              <View style={styles.rate}>
                <Text style={styles.textPrice}>$28</Text>
                <Text style={styles.textRate}>/night</Text>
              </View>
            </View>
          </View>

          {/*Product 2 */}
          <View style={styles.product}>
            <TouchableOpacity style={styles.productImageContainer}>
              <Image
                source={require("../Image/homescreen/ApartmentinSanJose.png")}
                style={styles.productImage}
              />
            </TouchableOpacity>
            <View style={styles.productLine1}>
              <Text style={styles.titleProduct}>Apartment in Omaha</Text>
              <View style={styles.rate}>
                <Image
                  source={require("../Image/homescreen/icon/star.png")}
                  style={styles.starIcon}
                />
                <Text style={styles.textRate}>5.0</Text>
              </View>
            </View>
            <View style={styles.productLine2}>
              <Text style={styles.type}>Beach</Text>
              <View style={styles.rate}>
                <Text style={styles.textPrice}>$28</Text>
                <Text style={styles.textRate}>/night</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {/*Footer*/}
        <View style={styles.footer}>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity style={styles.footerItem}>
              <Image
                source={require("../Image/dataicon/search.png")}
                style={styles.footerIcon}
              />
              <Text style={styles.textFooter}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity style={styles.footerItem}
              onPress={() => {handleFavorite()}}>
              <Image
                source={require("../Image/homescreen/icon/favourite.png")}
                style={styles.footerIcon}
              />
              <Text style={styles.textFooter}>Favorites</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity style={styles.footerItem}>
              <Image
                source={require("../Image/homescreen/icon/application.png")}
                style={styles.footerIcon}
              />
              <Text style={styles.textFooter}>Bookings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity style={styles.footerItem}>
              <Image
                source={require("../Image/dataicon/chat.png")}
                style={styles.footerIcon}
              />
              <Text style={styles.textFooter}>Inbox</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerItemContainer}>
            <TouchableOpacity style={styles.footerItem}>
              <Image
                source={require("../Image/dataicon/usericon.png")}
                style={styles.footerIcon}
              />
              <Text style={styles.textFooter}>Profile</Text>
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
    backgroundColor: '#E0FFFF',
  },
  ScrollViewContainer: {
    backgroundColor: "#fff",
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
  },
  footerItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textFooter: {
    fontSize: 12,
  },
});

export default HomeScreen;
