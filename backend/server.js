const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

// body parser middleware (to parse data from req.body in POST req's )
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api is running');
});

// notes route
app.use('/api/notes', require('./routes/notesRoutes'));

// members routes
app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, console.log(`server started on port ${PORT}`));
