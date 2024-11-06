import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

const DateSelectionScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [daysCount, setDaysCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Choose dates"); // Lựa chọn "Choose dates" hoặc "Anytime"
  const [currentMonth, setCurrentMonth] = useState(1); // Tháng (1-12)
  const [currentYear, setCurrentYear] = useState(2022); // Năm

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate(); // Số ngày trong tháng
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
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
    <View style={{ height: '100vh', overflow: 'auto' }}>
    <View style={styles.container}>
      <View style={styles.closeContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>x</Text>
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.locationValue}>Anywhere</Text>
      </View>

      {/* When Staying */}
      <View style={styles.stayContainer}>
        <Text style={styles.stayTitle}>When staying</Text>
        <View style={styles.stayOptions}>
          <TouchableOpacity
            style={[
              styles.stayOptionButton,
              selectedOption === "Choose dates" && styles.stayOptionButtonActive,
            ]}
            onPress={() => setSelectedOption("Choose dates")}
          >
            <Text
              style={[
                styles.stayOptionText,
                selectedOption === "Choose dates" && styles.stayOptionTextActive,
              ]}
            >
              Choose dates
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.stayOptionButton,
              selectedOption === "Anytime" && styles.stayOptionButtonActive,
            ]}
            onPress={() => setSelectedOption("Anytime")}
          >
            <Text
              style={[
                styles.stayOptionText,
                selectedOption === "Anytime" && styles.stayOptionTextActive,
              ]}
            >
              Anytime
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarMonth}>
              {new Date(currentYear, currentMonth - 1).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </Text>
            <View style={styles.calendarNav}>
              <TouchableOpacity onPress={handlePreviousMonth}>
                <Text style={styles.navButton}>{"<"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth}>
                <Text style={styles.navButton}>{">"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Week Days */}
          <View style={styles.weekDays}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <Text key={day} style={styles.weekDay}>
                {day}
              </Text>
            ))}
          </View>

          {/* Dates */}
          <View style={styles.datesContainer}>
            {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }, (_, i) => (
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
          <TouchableOpacity
            onPress={decreaseDaysCount}
            style={styles.counterButton}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.daysText}>{daysCount} days</Text>
          <TouchableOpacity
            onPress={increaseDaysCount}
            style={styles.counterButton}
          >
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    width: '90%',
    marginLeft: 16,
  },
  closeContainer: {
    marginTop: 0,
    alignItems: "flex-end",
    marginBottom: 16,
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 22,
    color: "#777",
  },
  locationLabel: {
    fontSize: 16,
    color: "#777",
  },
  locationValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stayContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  stayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  stayOptions: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stayOptionButtonActive: {
    flex: 1,
    backgroundColor: "#00bfff",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  stayOptionButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginLeft: 8,
  },
  stayOptionTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  stayOptionText: {
    color: "#333",
  },
  calendarContainer: {
    marginTop: 16,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  calendarMonth: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarNav: {
    flexDirection: "row",
  },
  navButton: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekDay: {
    color: "#777",
  },
  datesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  date: {
    width: "13%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  selectedDate: {
    backgroundColor: "#00bfff",
  },
  dateText: {
    color: "#333",
  },
  daysCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  counterButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  counterText: {
    fontSize: 16,
    color: "#333",
  },
  daysText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '90%',
    marginLeft: 16,
    alignItems: "center",
    paddingBottom: 15,
  },
  footerText: {
    fontSize: 16,
    color: "#777",
  },
  nextButton: {
    backgroundColor: "#00bfff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  selectedDate: {
    backgroundColor: "#00bfff",
  },
});

export default DateSelectionScreen;