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

      // Mặc định vai trò là "user" khi đăng ký
      const role = 'user';

      const sql = `INSERT INTO users (phone_number, country_code, username, email, password, avatar_url, role) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

      db.query(sql, [phone_number, country_code, username, email, hashedPassword, avatarUrl, role], (err, result) => {
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

      // Kiểm tra role của người dùng
      if (user.role === 'admin') {
        // Nếu là admin
        return res.status(200).json({
          message: 'Login successful as Admin',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      } else if (user.role === 'user') {
        // Nếu là user
        return res.status(200).json({
          message: 'Login successful as User',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        // Nếu role không hợp lệ
        return res.status(403).json({ error: 'Unauthorized role' });
      }
    });
  }
);

// profile 
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
});

// update user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email, phone_number, country_code, avatar_url } = req.body;
  const sql = `UPDATE users SET username = ?, email = ?, phone_number = ?, country_code = ?, avatar_url = ? WHERE id = ?`;

  db.query(
    sql,
    [username, email, phone_number, country_code, avatar_url, userId],
    (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ message: 'Profile updated successfully' });
    }
  );
});

// API cập nhật mật khẩu bằng email
app.patch('/users', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'UPDATE users SET password = ? WHERE email = ?';

    db.query(sql, [hashedPassword, email], (err, result) => {
      if (err) {
        console.error('Database Error:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Email not found' });
      }

      res.status(200).json({ message: 'Password updated successfully' });
    });
  } catch (error) {
    console.error('Server Error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});



// delete
app.delete('/deleteAccount', (req, res) => {
  const userId = req.query.userId; // Lấy userId từ client
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Account deleted successfully' });
  });
});

//add product
app.post('/products', (req, res) => {
  const { name, category, price, rating, image_url, description } = req.body;

  const sql = `INSERT INTO products (name, category, price, rating, image_url, description) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, category, price, rating, image_url, description], (err, result) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  });
});
//get product
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});
//update product
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, category, price, rating, image_url, description } = req.body;

  const sql = `UPDATE products SET name = ?, category = ?, price = ?, rating = ?, image_url = ?, description = ?, updated_at = NOW()
               WHERE id = ?`;

  db.query(sql, [name, category, price, rating, image_url, description, productId], (err, result) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  });
});
//API kiểm tra số điện thoại có tồn tại trong cơ sở dữ liệu hay không
app.get('/check-phone', (req, res) => {
  const { phone_number } = req.query;

  if (!phone_number) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  const sql = 'SELECT id FROM users WHERE phone_number = ?';
  db.query(sql, [phone_number], (err, results) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Phone number already exists' });
    }

    res.status(200).json({ message: 'Phone number is available' });
  });
});


//delete product
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;

  const sql = 'DELETE FROM products WHERE id = ?';

  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});
// API thêm tin nhắn mới vào `message_histories`
app.post('/messages', (req, res) => {
  const { conversation_id, sender, message } = req.body;
  const time = new Date(); // Lấy thời gian hiện tại

  const sql = `
    INSERT INTO message_histories (message_id, sender, message, time) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [conversation_id, sender, message, time], (err, result) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    // Cập nhật thông tin tin nhắn mới nhất trong bảng messages
    const updateSql = `
      UPDATE messages 
      SET latest_message = ?, latest_time = ? 
      WHERE id = ?
    `;
    db.query(updateSql, [message, time, conversation_id], (updateErr) => {
      if (updateErr) {
        console.error('Database Update Error:', updateErr.message);
        return res.status(500).json({ error: 'Database update error' });
      }
      res.status(201).json({ message: 'Message sent successfully' });
    });
  });
});

// get messages
app.get('/messages', (req, res) => {
  const sql = 'SELECT * FROM messages';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json(results);
  });
});
// getlịch sử tin nhắn của một cuộc hội thoại
app.get('/messages/:id/history', (req, res) => {
  const messageId = req.params.id;

  const sql = 'SELECT * FROM message_histories WHERE message_id = ?';

  db.query(sql, [messageId], (err, results) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json(results);
  });
});

// xoa 
app.delete('/messages/:id', (req, res) => {
  const messageId = req.params.id;

  const sql = 'DELETE FROM messages WHERE id = ?';

  db.query(sql, [messageId], (err, result) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json({ message: 'Conversation deleted successfully' });
  });
});

//API cho danh sách hội thoại
app.get('/conversations', (req, res) => {
  const sql = `
    SELECT 
      m.id, 
      m.sender_name, 
      m.subject, 
      m.latest_message, 
      m.latest_time, 
      m.avatar_url 
    FROM messages m
    ORDER BY m.latest_time DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});
//API chi tiết hội thoại
app.get('/conversations/:id', (req, res) => {
  const conversationId = req.params.id;

  const sql = `
    SELECT 
      mh.id, 
      mh.sender, 
      mh.message, 
      mh.time 
    FROM message_histories mh
    WHERE mh.message_id = ?
    ORDER BY mh.time ASC
  `;

  db.query(sql, [conversationId], (err, results) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});


//get booking
app.get('/bookings', (req, res) => {
  const sql = `
    SELECT b.*, u.username AS user_name, p.name AS product_name 
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN products p ON b.product_id = p.id
    ORDER BY b.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});



// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
