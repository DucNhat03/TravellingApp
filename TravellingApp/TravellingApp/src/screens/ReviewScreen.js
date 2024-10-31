import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';

const reviews = [
  {
    id: 1,
    name: "John King",
    time: "A day ago",
    rating: 5,
    comment: "We loved staying in this charming home! It had all the amenities we needed, and the historic...",
    avatar: require('../reviewscreen/logo.png')
  },
  {
    id: 2,
    name: "Jennifer Harris",
    time: "A day ago",
    rating: 4,
    comment: "While the location of this home was convenient, we were disappointed with the cleanliness and overall...",
    avatar: require('../reviewscreen/logo.png')
  },
  {
    id: 3,
    name: "John Edwards",
    time: "A day ago",
    rating: 5,
    comment: "This home was perfect for our family vacation! The kids loved the pool and the game room...",
    avatar: require('../reviewscreen/logo.png')
  },
  {
    id: 4,
    name: "Elizabeth Lopez",
    time: "A day ago",
    rating: 5,
    comment: "The photos don't do this home justice - it's absolutely stunning in person...",
    avatar: require('../reviewscreen/logo.png')
  }
];

const ReviewsScreen = () => (
  <ScrollView style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../facilities/backicon.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
    </View>

    {/* Review Summary */}
    <Text style={styles.reviewCount}>262 reviews</Text>
    <View style={styles.summaryContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>5/5</Text>
        <Image source={require('../reviewscreen/rating5.png')} style={styles.starIcon} />
      </View>

      {/* Rating distribution */}
      <View style={styles.ratingDistribution}>
        {Array.from({ length: 5 }, (_, index) => (
          <View key={index} style={styles.ratingRow}>
            <View style={styles.ratingBarContainer}>
              <View style={[styles.ratingBar, { width: `${(5 - index) * 20}%` }]} />
            </View>
            <Text style={styles.ratingLabel}>{5 - index}</Text>
          </View>
        ))}
      </View>
    </View>

    {/* Reviews List */}
    <View style={styles.reviewsList}>
      {reviews.map(review => (
        <View key={review.id} style={styles.reviewItem}>
          <Image source={review.avatar} style={styles.avatar} />
          <View style={styles.reviewContent}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{review.name}</Text>
              <Image source={require('../reviewscreen/rating5.png')} style={styles.starIcon} />
            </View>
            <Text style={styles.reviewTime}>{review.time}</Text>
            <Text style={styles.reviewText}>{review.comment}</Text>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '35%',
  },
  summaryContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  reviewCount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  starIcon: {
    width: 100,
    height: 20,
    resizeMode: 'cover',
  },
  ratingDistribution: {
    width: '40%',
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingLabel: {
    width: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8
  },
  ratingBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: 8,
  },
  ratingBar: {
    height: '100%',
    backgroundColor: '#f5a623',
  },
  reviewsList: {
    marginTop: 16,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewStarIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  reviewTime: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default ReviewsScreen;
