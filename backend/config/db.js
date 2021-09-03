const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      //       useCreateIndex: true,
    });
    console.log('database connected', conn.connection.host);
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

module.exports = connectDB;

// useCreateIndex not supported anymore
// https://stackoverflow.com/a/68962378
