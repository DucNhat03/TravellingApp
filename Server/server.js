const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:8081' }));
app.use(bodyParser.json({ limit: '10mb' })); // Tăng giới hạn dữ liệu JSON
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Tạo kết nối cơ sở dữ liệu
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'sapassword',
  database: 'travelingapp',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// API đăng ký
app.post(
  '/register',
  [
    body('phone_number').isMobilePhone().withMessage('Invalid phone number'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('username').notEmpty().withMessage('Username is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation error',
        details: errors.array(),
      });
    }

    const { phone_number, country_code, username, email, password, avatar } = req.body;

    let avatarUrl = null;
    if (avatar) {
      try {
        // Decode base64 and save the file
        const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `uploads/${Date.now()}.png`;

        fs.writeFileSync(path.join(__dirname, filename), buffer);
        avatarUrl = `/${filename}`;
      } catch (error) {
        console.error('Error saving avatar:', error.message);
        return res.status(500).json({ error: 'Failed to save avatar' });
      }
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `INSERT INTO users (phone_number, country_code, username, email, password, avatar_url) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(sql, [phone_number, country_code, username, email, hashedPassword, avatarUrl], (err, result) => {
        if (err) {
          console.error('Database Error:', err.message);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    } catch (error) {
      console.error('Server Error:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API để lấy danh sách người dùng (GET /users)
app.get('/users', (req, res) => {
  const sql = 'SELECT id, email, password FROM users';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json(results);
  });
});

// API đăng nhập
app.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation error',
        details: errors.array(),
      });
    }

    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error('Database Error:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];

      // So sánh mật khẩu chưa mã hóa với mật khẩu đã mã hóa
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    });
  }
);
// profile 
// API to get user by ID
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId; // Get userId from the URL parameter
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]); // Return the user data
  });
});


// delete
app.delete('/deleteAccount', (req, res) => {
  const userId = req.query.userId; // Lấy userId từ client
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Account deleted successfully' });
  });
});



// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
