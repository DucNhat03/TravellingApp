import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DetailScreen = () => {
  return (
    <View style={{ height: '100vh', overflow: 'auto' }}>
    <ScrollView style={{ overflow: 'auto', flex: 1}} >
      {/* Header Image */}
      <View style={styles.headerImageContainer}>
        <Image source={require('../homescreen/ApartmentinOmaha.png')} style={styles.headerImage} />
        <TouchableOpacity style={styles.heartIcon}>
          <Text>❤️</Text>
        </TouchableOpacity>
        <Text style={styles.imageCount}>24</Text>
      </View>

      {/* Title and Location */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Balian treehouse</Text>
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
        <Text style={styles.facilityDetails}>2 Guests   1 bedroom   1 bed   1 bath</Text>
        <View style={styles.facilityIcons}>
          <Text>📶 Wifi</Text>
          <Text>🍳 Kitchen</Text>
          <Text>🏊 Pool</Text>
          <Text>🌳 Garden</Text>
        </View>
        <TouchableOpacity>
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
          <Text>The location was perfect, the house was spacious and clean, and the amenities ...</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Policies */}
      <View style={styles.policiesContainer}>
        <Text style={styles.sectionTitle}>Policies</Text>
        <Text style={styles.policyTitle}>House rules</Text>
        <Text>🕒 Earliest check-in time: 14:00</Text>
        <Text>🕒 Latest check-out time: 12:00</Text>
        <Text style={styles.policyTitle}>Checkin policies</Text>
        <Text>It’s always a good idea to confirm the check-in policy directly with the owner/manager...</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>View more</Text>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Image source={require('../homescreen/ApartmentinOmaha.png')} style={styles.descriptionImage} />
        <Text>Looking for the perfect place to relax and unwind? This stunning Balinese villa is the ultimate tropical getaway...</Text>
        <TouchableOpacity>
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
    backgroundColor: '#f9f9f9',
   
  },
  headerImageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  heartIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  imageCount: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  titleContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#777',
  },
  viewMap: {
    color: '#00bfff',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 16,
    color: '#777',
  },
  facilitiesContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  facilityDetails: {
    fontSize: 14,
    color: '#777',
    marginVertical: 8,
  },
  facilityIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  showAll: {
    color: '#00bfff',
    marginTop: 8,
  },
  reviewsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  reviewSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  review: {
    marginBottom: 8,
  },
  seeAll: {
    color: '#00bfff',
  },
  policiesContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  viewMore: {
    color: '#00bfff',
    marginTop: 8,
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  descriptionImage: {
    width: '100%',
    height: 150,
    marginVertical: 8,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetailScreen;
