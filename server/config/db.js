const mongoose = require('mongoose');

const connectDB = () => {
  // console.log(process.env.MONGOURL_PROD);
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB Connected...');
  }
  ).catch(err => {
    console.log(err);
  }
  );
}
module.exports = connectDB;