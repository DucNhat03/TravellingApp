import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const SearchScreen = ({ navigation }) => {
  const apartments = [
    {
      id: '1',
      title: 'Apartment in Omaha',
      image: 'https://i.pinimg.com/236x/0a/31/98/0a31985bc97c57837fcc2f46551faec1.jpg', // Thay bằng URL hình thực tế
      price: '$20/night',
      rating: 5.0,
      location: 'Beach',
    },
    {
      id: '2',
      title: 'Apartment in San Jose',
      image: 'https://i.pinimg.com/236x/0a/31/98/0a31985bc97c57837fcc2f46551faec1.jpg', // Thay bằng URL hình thực tế
      price: '$28/night',
      rating: 5.0,
      location: 'Beach',
    },
    // Thêm các apartment khác nếu cần
  ];

  const renderApartmentItem = ({ item }) => (
    <View style={styles.apartmentContainer}>
      <Image source={{ uri: item.image }} style={styles.apartmentImage} />
      <View style={styles.apartmentDetails}>
        <Text style={styles.apartmentTitle}>{item.title}</Text>
        <Text style={styles.apartmentLocation}>{item.location}</Text>
        <View style={styles.priceAndRatingContainer}>
          <Text style={styles.apartmentPrice}>{item.price}</Text>
          <Text style={styles.apartmentRating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Where do you want to stay?" 
        />
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Beach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Mountain</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Camping</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <FlatList
          data={apartments}
          renderItem={renderApartmentItem}
          keyExtractor={(item) => item.id}
          style={styles.apartmentList}
        />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" type="font-awesome" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Favorites')}>
          <Icon name="heart" type="font-awesome" />
          <Text style={styles.iconText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Bookings')}>
          <Icon name="book" type="font-awesome" />
          <Text style={styles.iconText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Inbox')}>
          <Icon name="envelope" type="font-awesome" />
          <Text style={styles.iconText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" type="font-awesome" />
          <Text style={styles.iconText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  apartmentContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  apartmentImage: {
    width: '100%',
    height: 150,
  },
  apartmentDetails: {
    padding: 10,
  },
  apartmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  apartmentLocation: {
    fontSize: 12,
    color: '#888',
  },
  priceAndRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  apartmentPrice: {
    fontSize: 16,
    color: '#00C2F3',
  },
  apartmentRating: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#333',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default SearchScreen;
