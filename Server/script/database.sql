USE travelingapp

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    country_code VARCHAR(5) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE users
ADD role ENUM('user', 'admin') DEFAULT 'user' AFTER updated_at;

USE travelingapp;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating FLOAT CHECK (rating >= 0 AND rating <= 5),
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    latest_message TEXT NOT NULL,
    latest_time DATETIME NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE message_histories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_id INT NOT NULL,
    sender VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
INSERT INTO bookings (user_id, product_id, booking_date, booking_time, amount, status)
VALUES 
(1, 1, '2024-11-15', '14:00:00', 120.00, 'Confirmed'),
(1, 2, '2024-11-16', '10:00:00', 150.00, 'Pending'),
(2, 1, '2024-11-14', '16:30:00', 100.00, 'Cancelled');

USE travelingapp;

INSERT INTO products (name, category, price, rating, image_url) VALUES
('Apartment Luxury 1', 'Beach', 28, 5.0, 'http://localhost:3000/uploads/ApartmentinOmaha.png'),
('Mountain Luxury 1', 'Mountain', 35, 4.8, 'http://localhost:3000/uploads/Mountain.png'),
('Camping Tent', 'Camping', 15, 4.5, 'http://localhost:3000/uploads/camping.png'),
('Apartment View Beaches', 'Beach', 28, 5.0, 'http://localhost:3000/uploads/Beach.png'),
('Mountain Luxury 2', 'Mountain', 35, 4.8, 'http://localhost:3000/uploads/Mountain.png'),
('Camping Tent 2', 'Camping', 15, 4.5, 'http://localhost:3000/uploads/camping.png'),
('Apartment Luxury View Beaches', 'Beach', 28, 5.0, 'http://localhost:3000/uploads/ApartmentinOmaha.png'),
('Mountain Luxury 3', 'Mountain', 35, 4.8, 'http://localhost:3000/uploads/Mountain.png'),
('Camping Luxury 3', 'Camping', 15, 4.5, 'http://localhost:3000/uploads/camping.png'),
('Apartment Luxury 2', 'Beach', 28, 5.0, 'http://localhost:3000/uploads/Beach.png'),
('Mountain Luxury 4', 'Mountain', 35, 4.8, 'http://localhost:3000/uploads/Mountain.png'),
('Camping Tent 4', 'Camping', 15, 4.5, 'http://localhost:3000/uploads/camping.png');

INSERT INTO messages (sender_name, subject, latest_message, latest_time, avatar_url)
VALUES
('John Doe', 'Booking Inquiry', 'Hi, I have a question about my booking...', '2024-11-16 10:30:00', 'path_to_avatar1.png'),
('Jane Smith', 'Payment Confirmation', 'Your payment has been received. Thank you!', '2024-11-16 09:15:00', 'path_to_avatar2.png'),
('Host Support', 'Welcome to our service', 'We are here to help you with your stay.', '2024-11-15 18:00:00', 'path_to_avatar3.png');


INSERT INTO message_histories (message_id, sender, message, time)
VALUES
(1, 'John Doe', 'Hi, I have a question about my booking...', '2024-11-16 10:30:00'),
(1, 'You', 'Sure, how can I help?', '2024-11-16 10:32:00'),
(2, 'Jane Smith', 'Your payment has been received. Thank you!', '2024-11-16 09:15:00'),
(3, 'Host Support', 'We are here to help you with your stay.', '2024-11-15 18:00:00');


 



