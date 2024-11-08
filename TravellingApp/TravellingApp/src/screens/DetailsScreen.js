import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const DetailsScreen = ({ navigation }) => (

  <View style={{ height: '100vh', overflow: 'auto' }}>
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {navigation.goBack()}}>
          <Image source={require('../Image/facilities/backicon.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Facilities & services</Text>
      </View>

      {/* Facilities Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>2 Guests</Text>
          <Text style={styles.infoText}>1 bedroom</Text>
          <Text style={styles.infoText}>1 bed</Text>
          <Text style={styles.infoText}>1 bath</Text>
        </View>
        
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/wifi.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Wifi</Text>
        </View>
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/kitchen.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Kitchen</Text>
        </View>
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/exercise.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Exercise equipment</Text>
        </View>
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/pool.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Pool</Text>
        </View>
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/garden.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Garden</Text>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        
        <Text style={styles.subsectionTitle}>Cleaning & laundry</Text>
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/washer.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Washer</Text>
        </View>
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/dryer.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Free dryer - In unit</Text>
        </View>
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/iron.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Iron</Text>
        </View>

        <Text style={styles.subsectionTitle}>Bathroom</Text>
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/bathtub.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Bathtub</Text>
        </View>
        <View style={styles.facility}>
          <Image source={require('../Image/facilities/hairdryer.png')} style={styles.facilityIcon} />
          <Text style={styles.facilityText}>Hair dryer</Text>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  facility: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  facilityIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    resizeMode: 'contain',
  },
  facilityText: {
    fontSize: 16,
  },
});

export default DetailsScreen;
