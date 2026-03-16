const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., 'SUV', 'Sedan', 'Sports', 'Electric'
  description: { type: String, required: true },
  colors: [{ type: String }],
  images: [{ type: String }], // URLs to images
  specs: {
    horsepower: { type: Number },
    zeroToHundred: { type: Number }, // in seconds
    rangeOrMpg: { type: String }, // e.g., '500 km' or '15 km/l'
    drivetrain: { type: String } // e.g., 'AWD', 'RWD', 'FWD'
  }
});

module.exports = mongoose.model('Car', carSchema);
