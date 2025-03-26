// controllers/businessController.js
import connectDB from './config/connectDB.js';// Adjust the path if necessary
import dotenv from 'dotenv';
import Location from './hrms/models/Location.js';
dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const hrmsDBConnection = await connectDB(DB_URL, 'hrmsDB');
async function createLocations() {
    const locations = [
      'Azadpur',
      'Dwarka - Sector-7',
      'Badli Extension',
      'Jawala Puri',
      'Madipur',
      'Mangolpuri',
      'Narela',
      'Wazirpur',
      'Model Town',
      'Sarojini Nagar',
      'Karampura',
      'Inderlok',
      'Lajpat Nagar',
      'Nangloi',
      'Kalka Ji',
      'Mayapuri',
      'Mayur Vihar',
      'Vasant Kunj',
      'Mori Gate',
      'Najafgarh',
      'Nand Nagri',
      'Moti Nagar',
      'Okhla',
      'Paharganj',
      'Tagore Garden',
      'Rohini - Sector-5',
      'Seelampur',
      'Shastri Nagar',
      'Shakti Nagar',
      'Ambedkar Nagar - Sector-1',
      'Tilak Vihar',
      'V K Nagar',
      'Outer Ring Road',
    ];
  
    for (const locationName of locations) {
      let location = await Location.findOne({ name: locationName });
      if (!location) {
        location = new Location({ name: locationName });
        await location.save();
        console.log('Location created:', location.name);
      }
    }
 //let location = await Location.find();
//console.log(location)
  }
  
  createLocations();
  