import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import html2pdf from 'html2pdf.js';

const PaymentSuccessScreen = () => {
  const createPDF = () => {
    // Nội dung HTML cho PDF
    const content = `
      <div style="text-align: center;">
        <h1>Payment Success</h1>
        <p><strong>Ref number:</strong> 00000072697027</p>
        <p><strong>Date:</strong> 10-31-2024</p>
        <p><strong>Time:</strong> 11:40 PM</p>
        <p><strong>Payment method:</strong> Credit card</p>
        <p><strong>Amount:</strong> $100</p>
      </div>
    `;

    if (Platform.OS === 'web') {
      // Tạo và tải PDF trên nền tảng web
      const opt = {
        margin:       0.5,
        filename:     'PaymentReceipt.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
    
      html2pdf().from(content).set(opt).output('bloburl').then((pdfUrl) => {
        window.open(pdfUrl, '_blank');
      });
    } else {
      // Đối với các nền tảng khác (iOS/Android), bạn có thể thêm mã cho thư viện phù hợp
      alert("PDF generation is only supported on web in this example.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Icon Success */}
      <Image source={require('../Image/dataicon/checkBigSize.png')} style={styles.successIcon} />

      {/* Title */}
      <Text style={styles.title}>Payment success!</Text>

      {/* Transaction Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ref number</Text>
          <Text style={styles.detailValue}>00000072697027</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>10-31-2024</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time</Text>
          <Text style={styles.detailValue}>11:40 PM</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment method</Text>
          <Text style={styles.detailValue}>Credit card</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>$100</Text>
        </View>
      </View>

      {/* PDF Receipt Button */}
      <TouchableOpacity style={styles.pdfButton} onPress={createPDF}>
        <Text style={styles.pdfButtonText}>Get PDF receipt</Text>
      </TouchableOpacity>

      {/* View Booking Button */}
      <TouchableOpacity style={styles.viewBookingButton}>
        <Text style={styles.viewBookingButtonText}>View booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 14,
    color: '#777',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  pdfButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  pdfButtonText: {
    fontSize: 16,
    color: '#333',
  },
  viewBookingButton: {
    width: '100%',
    backgroundColor: '#00bfff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBookingButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentSuccessScreen;
