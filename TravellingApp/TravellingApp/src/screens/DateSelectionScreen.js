import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DateSelectionScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [daysCount, setDaysCount] = useState(1);

  const handlePreviousMonth = () => {
    // Hàm chuyển tháng trước (có thể mở rộng nếu cần)
  };

  const handleNextMonth = () => {
    // Hàm chuyển tháng sau (có thể mở rộng nếu cần)
  };

  const increaseDaysCount = () => {
    setDaysCount(daysCount + 1);
  };

  const decreaseDaysCount = () => {
    if (daysCount > 1) {
      setDaysCount(daysCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.locationValue}>Anywhere</Text>
      </View>

      {/* When Staying */}
      <View style={styles.stayContainer}>
        <Text style={styles.stayTitle}>When staying</Text>
        <View style={styles.stayOptions}>
          <TouchableOpacity style={styles.stayOptionButtonActive}>
            <Text style={styles.stayOptionTextActive}>Choose dates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stayOptionButton}>
            <Text style={styles.stayOptionText}>Anytime</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarMonth}>February 2022</Text>
            <View style={styles.calendarNav}>
              <TouchableOpacity onPress={handlePreviousMonth}>
                <Text style={styles.navButton}>{'<'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth}>
                <Text style={styles.navButton}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Week Days */}
          <View style={styles.weekDays}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <Text key={day} style={styles.weekDay}>{day}</Text>
            ))}
          </View>

          {/* Dates (dummy data for February) */}
          <View style={styles.datesContainer}>
            {Array.from({ length: 28 }, (_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.date,
                  selectedDate === i + 1 && styles.selectedDate,
                ]}
                onPress={() => setSelectedDate(i + 1)}
              >
                <Text style={styles.dateText}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Days Count */}
        <View style={styles.daysCounter}>
          <TouchableOpacity onPress={decreaseDaysCount} style={styles.counterButton}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.daysText}>{daysCount} days</Text>
          <TouchableOpacity onPress={increaseDaysCount} style={styles.counterButton}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 16,
    color: '#777',
  },
  locationValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stayContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  stayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stayOptions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stayOptionButtonActive: {
    flex: 1,
    backgroundColor: '#00bfff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  stayOptionButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  stayOptionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stayOptionText: {
    color: '#333',
  },
  calendarContainer: {
    marginTop: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarMonth: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarNav: {
    flexDirection: 'row',
  },
  navButton: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDay: {
    color: '#777',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  date: {
    width: '13%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedDate: {
    backgroundColor: '#00bfff',
  },
  dateText: {
    color: '#333',
  },
  daysCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  counterButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  counterText: {
    fontSize: 16,
    color: '#333',
  },
  daysText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  footerText: {
    fontSize: 16,
    color: '#777',
  },
  nextButton: {
    backgroundColor: '#00bfff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DateSelectionScreen;
