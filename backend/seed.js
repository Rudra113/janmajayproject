const mongoose = require('mongoose');
require('dotenv').config();
const Car = require('./models/Car');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-car-recommendation';

const sampleCars = [
  {
    make: 'Porsche',
    model: 'Taycan',
    year: 2024,
    price: 16100000,
    category: 'Electric',
    description: 'A striking electric sports car that delivers Porsche performance with zero emissions.',
    colors: ['White', 'Black', 'Frozen Blue Metallic', 'Carmine Red'],
    images: ['https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1000&auto=format&fit=crop'],
    specs: { horsepower: 402, zeroToHundred: 5.4, rangeOrMpg: '390 km', drivetrain: 'RWD' }
  },
  {
    make: 'BMW',
    model: 'M3 Competition',
    year: 2024,
    price: 14400000,
    category: 'Sports',
    description: 'The benchmark for high-performance sedans, offering blistering acceleration and razor-sharp handling.',
    colors: ['Isle of Man Green', 'Brooklyn Grey', 'Alpine White', 'Black Sapphire'],
    images: ['https://images.unsplash.com/photo-1623869675781-80aa31012a5a?q=80&w=1000&auto=format&fit=crop'],
    specs: { horsepower: 503, zeroToHundred: 4.1, rangeOrMpg: '8 km/l', drivetrain: 'RWD/AWD' }
  },
  {
    make: 'Land Rover',
    model: 'Range Rover',
    year: 2024,
    price: 23800000,
    category: 'SUV',
    description: 'The pinnacle of luxury SUVs, combining peerless refinement with legendary off-road capability.',
    colors: ['Fuji White', 'Santorini Black', 'Lantau Bronze', 'Portofino Blue'],
    images: ['https://images.unsplash.com/photo-1606132766327-0c1bd28ba1db?q=80&w=1000&auto=format&fit=crop'],
    specs: { horsepower: 395, zeroToHundred: 5.8, rangeOrMpg: '9 km/l', drivetrain: 'AWD' }
  },
  {
    make: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2024,
    price: 17100000,
    category: 'Sedan',
    description: 'The flagship luxury sedan that setting the standard for comfort, technology, and prestige.',
    colors: ['Obsidian Black', 'Cirrus Silver', 'Nautical Blue', 'Manufaktur Diamond White'],
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop'],
    specs: { horsepower: 429, zeroToHundred: 5.1, rangeOrMpg: '10 km/l', drivetrain: 'AWD' }
  },
  {
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 19500000,
    category: 'Electric',
    description: 'A breathtakingly beautiful electric grand tourer with ferocious acceleration and advanced technology.',
    colors: ['Kemora Gray', 'Tango Red', 'Mythos Black', 'Suzuka Gray'],
    images: ['https://images.unsplash.com/photo-1614026480209-cd9934144671?q=80&w=1000&auto=format&fit=crop'],
    specs: { horsepower: 637, zeroToHundred: 3.3, rangeOrMpg: '400 km', drivetrain: 'AWD' }
  },
  {
    make: 'Lexus',
    model: 'LC 500',
    year: 2024,
    price: 23900000,
    category: 'Coupe',
    description: 'A stunning grand touring coupe featuring a naturally aspirated V8 and exquisite Japanese craftsmanship.',
    colors: ['Infrared', 'Nightfall Mica', 'Caviar', 'Ultra White'],
    images: ['https://images.unsplash.com/photo-1595029337581-2ab250b7193b?q=80&w=1000&auto=format&fit=crop'],
    specs: { horsepower: 471, zeroToHundred: 4.7, rangeOrMpg: '8 km/l', drivetrain: 'RWD' }
  },
  {
    make: 'Tata',
    model: 'Nexon EV',
    year: 2024,
    price: 1450000,
    category: 'Electric',
    description: 'India\'s favorite electric SUV, offering a perfect blend of space, safety for the family, and punchy performance.',
    colors: ['Intensi-Teal', 'Daytona Grey', 'Pristine White', 'Flame Red'],
    images: ['https://images.unsplash.com/photo-1698224536780-e832d20dcf75?auto=format&fit=crop&q=80&w=1000'],
    specs: { horsepower: 142, zeroToHundred: 8.9, rangeOrMpg: '465 km', drivetrain: 'FWD' }
  },
  {
    make: 'MG',
    model: 'Windsor EV',
    year: 2024,
    price: 1350000,
    category: 'Electric',
    description: 'A spacious and futuristic family crossover electric vehicle with a glass roof and lounge-like interior.',
    colors: ['Starburst Black', 'Pearl White', 'Clay Beige'],
    images: ['https://images.unsplash.com/photo-1672305374828-d748da70fa4a?auto=format&fit=crop&q=80&w=1000'],
    specs: { horsepower: 134, zeroToHundred: 9.5, rangeOrMpg: '331 km', drivetrain: 'FWD' }
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Car.deleteMany({});
    console.log('Cleared existing cars');
    
    await Car.insertMany(sampleCars);
    console.log('Successfully seeded database with sample cars (INR constraints)');
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
  });
