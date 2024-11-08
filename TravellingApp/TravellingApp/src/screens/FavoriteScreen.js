import React from "react";
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

const FavoritesScreen = () => (
  <View style={{ height: "100vh", overflow: "auto" }}>
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollContainer}>
      {/*Search*/}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../Image/dataicon/backicon.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Favorites</Text>
        <TouchableOpacity>
          <Image
            source={require("../Image/dataicon/more.png")}
            style={styles.moreIcon}
          />
        </TouchableOpacity>
      </View>
      {/*Navigation*/}
      <View style={styles.navigation}>
        <Text style={styles.textNav}>Places you liked</Text>
      </View>

      
      {/*Product 1 */}
      <TouchableOpacity style={styles.product}>
        <Image
          source={require("../Image/homescreen/ApartmentinOmaha.png")}
          style={styles.productImage}
        />
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
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../Image/dataicon/singlebed.png")}
              style={styles.bedIcon}
            />
            <Text style={styles.type}>1 bedroom</Text>
          </View>
          <View style={styles.rate}>
            <Text style={styles.textPrice}>$28</Text>
            <Text style={styles.textRate}>/night</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/*Product 2 */}
      <TouchableOpacity style={styles.product}>
        <Image
          source={require("../Image/homescreen/ApartmentinOmaha.png")}
          style={styles.productImage}
        />
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
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../Image/dataicon/singlebed.png")}
              style={styles.bedIcon}
            />
            <Text style={styles.type}>1 bedroom</Text>
          </View>
          <View style={styles.rate}>
            <Text style={styles.textPrice}>$28</Text>
            <Text style={styles.textRate}>/night</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/*Product 3 */}
      <TouchableOpacity style={styles.product}>
        <Image
          source={require("../Image/homescreen/ApartmentinOmaha.png")}
          style={styles.productImage}
        />
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
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../Image/dataicon/singlebed.png")}
              style={styles.bedIcon}
            />
            <Text style={styles.type}>1 bedroom</Text>
          </View>
          <View style={styles.rate}>
            <Text style={styles.textPrice}>$28</Text>
            <Text style={styles.textRate}>/night</Text>
          </View>
        </View>
      </TouchableOpacity>

      
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
        <TouchableOpacity style={styles.footerItem}>
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
    backgroundColor: "#fff",
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
  bedIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    opacity: 0.6,
  },
});

export default FavoritesScreen;
