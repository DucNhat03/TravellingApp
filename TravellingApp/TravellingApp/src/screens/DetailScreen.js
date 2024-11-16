import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window"); // Lấy chiều rộng màn hình

const DetailScreen = ({ route, navigation }) => {
  const { product } = route.params; // Nhận thông tin sản phẩm từ route

  const [images] = useState([
    require("../Image/homescreen/ApartmentinOmaha.png"),
    require("../Image/homescreen/ApartmentinSanJose.png"),
    require("../Image/homescreen/ApartmentinOmaha.png"),
    require("../Image/homescreen/ApartmentinOmaha.png"),
    require("../Image/homescreen/ApartmentinSanJose.png"),
    require("../Image/homescreen/ApartmentinOmaha.png"),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScrollHandler = (event) => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width;
    const slideIndex = Math.floor(
      event.nativeEvent.contentOffset.x / slideWidth
    );
    setCurrentIndex(slideIndex);
  };
  
  const handleFacilities = () => {
    navigation.navigate("DetailsScreen");
  };
  const handleReviews = () => {
    navigation.navigate("ReviewsScreen");
  };
  const handleDescription = () => {
    navigation.navigate("DescriptionScreen");
  };
  const handlePoliciesDetail = () => {
    navigation.navigate("PoliciesDetailScreen");
  };
  return (
    <View style={{ height: "100vh", overflow: "auto" }}>
      <ScrollView style={{ overflow: "auto", flex: 1 }}>
        {/* Image Slider */}
        <View style={styles.imageSliderContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScrollHandler}
            scrollEventThrottle={12}
          >
            {images.map((image, index) => (
              <Image key={index} source={image} style={styles.sliderImage} />
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../Image/facilities/back.png")}
              style={styles.backButtonText}
            />
          </TouchableOpacity>
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {currentIndex + 1}/{images.length}
            </Text>
          </View>
        </View>

        {/* Title and Location */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Bali, Indonesia</Text>
            <TouchableOpacity>
              <Text style={styles.viewMap}>View map</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ 4.5/5</Text>
            <Text style={styles.reviewCount}>262 reviews</Text>
          </View>
        </View>

        {/* Facilities & Services */}
        <View style={styles.facilitiesContainer}>
          <Text style={styles.sectionTitle}>Facilities & services</Text>
          <Text style={styles.facilityDetails}>
            2 Guests 1 bedroom 1 bed 1 bath
          </Text>
          <View style={styles.facilityIcons}>
            <Text>📶 Wifi</Text>
            <Text>🍳 Kitchen</Text>
            <Text>🏊 Pool</Text>
            <Text>🌳 Garden</Text>
          </View>
          <TouchableOpacity 
            onPress={() => {handleFacilities()}}>
            <Text style={styles.showAll}>Show all</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewSummary}>
            <Text style={styles.rating}>4.5/5</Text>
            <Text>262 reviews</Text>
          </View>
          <View style={styles.review}>
            <Text>⭐</Text>
            <Text>Jinny Oslin</Text>
            <Text>A day ago</Text>
            <Text>
              The location was perfect, the house was spacious and clean, and
              the amenities ...
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {handleReviews()}}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Policies */}
        <View style={styles.policiesContainer}>
          <Text style={styles.sectionTitle}>Policies</Text>
          <View style={styles.hoursContainer}>
            <Text style={styles.policyTitle}>House rules</Text>
            <Text style={styles.policyText}>🕒 Earliest check-in time: 14:00</Text>
            <Text style={styles.policyText}>🕒 Latest check-out time: 12:00</Text>
          </View>
          <Text style={styles.policyTitlee}>Checkin policies</Text>
          <Text>
            It’s always a good idea to confirm the check-in policy directly with
            the owner/manager...
          </Text>
          <TouchableOpacity
            onPress={() => {handlePoliciesDetail()}}
          >
            <Text style={styles.viewMore}>View more</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Image
            source={require("../Image/homescreen/ApartmentinOmaha.png")}
            style={styles.descriptionImage}
          />
          <Text>
            Looking for the perfect place to relax and unwind? This stunning
            Balinese villa is the ultimate tropical getaway...
          </Text>
          <TouchableOpacity
            onPress={() => {handleDescription()}}>
            <Text style={styles.viewMore}>View more</Text>
          </TouchableOpacity>
        </View>

        {/* Price and Book Now */}
        <View style={styles.footer}>
          <Text style={styles.price}>From: $20/night</Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  imageSliderContainer: {
    position: "relative",
    height: 220,
  },
  sliderImage: {
    width: width, // Đảm bảo hình ảnh chiếm toàn bộ chiều rộng màn hình
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  hoursContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingBottom: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backButtonText: {
    color: "#fff",
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  imageCounter: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  imageCounterText: {
    color: "#fff",
    fontSize: 14,
  },
  titleContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  locationText: {
    fontSize: 16,
    color: "#777",
  },
  viewMap: {
    color: "#00bfff",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 16,
    color: "#777",
  },
  facilitiesContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  facilityDetails: {
    fontSize: 14,
    color: "#777",
    marginVertical: 8,
  },
  facilityIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  showAll: {
    color: "#00bfff",
    marginTop: 8,
  },
  reviewsContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  reviewSummary: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  review: {
    marginBottom: 8,
  },
  seeAll: {
    color: "#00bfff",
  },
  policiesContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: "450",
    marginLeft: 8,
  },
  policyTitlee: {
    fontSize: 16,
    fontWeight: "bold",
  },
  policyText: {
    marginLeft: 8,
  },
  viewMore: {
    color: "#00bfff",
    marginTop: 8,
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  descriptionImage: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookButton: {
    backgroundColor: "#00bfff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DetailScreen;
