const express = require('express');
const dotenv = require('dotenv');
const cors =require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Main Route Definitions ---
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/subjects', require('./routes/subject.routes.js'));
app.use('/api/grades', require('./routes/grade.routes.js'));
app.use('/api/marks', require('./routes/mark.routes.js'));
app.use('/api/attendance', require('./routes/attendance.routes.js'));

// Simple test
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

// Connect to the database and then start the server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to connect to MongoDB, server did not start.', err);
  process.exit(1);
});