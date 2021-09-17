const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path');

const app = express();

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

// body parser middleware (to parse data from req.body in POST req's )
app.use(express.json());

// notes route
app.use('/api/notes', require('./routes/notesRoutes'));

// users routes
app.use('/api/users', require('./routes/userRoutes'));

// ===================   deployment  ==========================
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Api is running');
  });
}

// ======================================================

// error handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server started on port ${PORT}`));
