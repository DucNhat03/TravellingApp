import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';



const LoginScreen = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navLogin = () => {
    navigation.navigate('Login2');
  };

  const navRegister = () => {
    navigation.navigate('RegisterAccount');
  };

  const countries = [
    { label: 'USA', value: 'US', flag: require('../Image/flags/us.png'), code: '+1' },
    { label: 'Vietnam', value: 'VN', flag: require('../Image/flags/vn.png'), code: '+84' },
    { label: 'Australia', value: 'AU', flag: require('../Image/flags/au.png'), code: '+61' },
    { label: 'Germany', value: 'DE', flag: require('../Image/flags/de.png'), code: '+49' },
    { label: 'India', value: 'IN', flag: require('../Image/flags/in.png'), code: '+91' },
    { label: 'France', value: 'FR', flag: require('../Image/flags/fr.png'), code: '+33' },
  ];

  const getPlaceholder = () => {
    const selectedCountry = countries.find((c) => c.value === countryCode);
    return selectedCountry ? `${selectedCountry.code} Mobile number` : 'Enter phone number';
  };

  const renderRow = (item) => (
    <View style={styles.dropdownRow}>
      <Image source={item.flag} style={styles.flag} />
      <Text style={styles.countryLabel}>{item.label}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.label}>Enter your mobile number:</Text>

        <View style={styles.phoneInputContainer}>
          <ModalDropdown
            options={countries}
            renderRow={renderRow}
            onSelect={(index) => setCountryCode(countries[index].value)}
            dropdownStyle={styles.dropdownStyle}
            renderButtonText={(rowData) => (
              <View style={styles.selectedContainer}>
                <Image source={rowData.flag} style={styles.flag} />
              </View>
            )}
            style={styles.dropdownButton}
          />
          <TextInput
            style={styles.input}
            placeholder={getPlaceholder()}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Button title="Continue" buttonStyle={styles.continueButton} onPress={navRegister}/>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity style={styles.authButton}>
          <Icon name="apple" type="font-awesome" size={20} />
          <Text style={styles.authButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authButton}>
          <Icon name="facebook" type="font-awesome" color="#3b5998" size={20} />
          <Text style={[styles.authButtonText, { color: '#3b5998' }]}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authButton}>
          <Icon name="google" type="font-awesome" color="#DB4437" size={20} />
          <Text style={[styles.authButtonText, { color: '#DB4437' }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          By signing up, you agree to our{' '}
          <Text style={styles.linkText} onPress={() => Linking.openURL('#')}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={styles.linkText} onPress={() => Linking.openURL('#')}>
            Privacy Policy
          </Text>.
        </Text>

        <TouchableOpacity onPress={navLogin}>
          <Text style={styles.loginText}>
            Already had an account? <Text style={styles.linkText}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdownButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  dropdownStyle: {
    width: 200,
    marginTop: 10,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flag: {
    width: 25,
    height: 17,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10
  },
  countryLabel: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10
  },
  continueButton: {
    backgroundColor: '#00C2F3',
    marginVertical: 20,
  },
  orText: {
    alignSelf: 'center',
    marginVertical: 5,
    paddingBottom: 10,
    opacity: 0.6
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    justifyContent: 'center',
  },
  authButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#888',
  },
  linkText: {
    color: '#00C2F3',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});

export default LoginScreen;
