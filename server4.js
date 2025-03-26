import mongoose from 'mongoose';
import connectDB from './config/connectDB.js';// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const hrmsDBConnection = await connectDB(DB_URL, 'hrmsDB');
import Location from './hrms/models/Location.js';
import Dispensary from './hrms/models/Despensary.js';

async function createDispensaries() {
    const dispensaries = [
      {
        name: 'Medical Officer Incharge, ESI Dispensary, C-235, Model Town-III',
        address: 'C-235, Model Town-III, Azadpur, DELHI',
        location: 'Azadpur',
      },
      {
        name: 'Near Vardhman Mall, Sec 7 Dwarka New delhi',
        address: 'Near Vardhman Mall, Sec 7 Dwarka New delhi',
        location: 'Dwarka - Sector-7',
      },
      {
        name: 'JAHANGIRPURI BADLI EXTENSION A-79,Badli Extension, Outer Ring Road, New Delhi',
        address: 'A-79, Badli Extension, Outer Ring Road, New Delhi',
        location: 'Badli Extension',
      },
      {
        name: 'JAWALAPURI Resettlement Colony, Phase-4,Jawalapuri, New Delhi',
        address: 'Resettlement Colony, Phase-4,Jawalapuri, New Delhi',
        location: 'Jawala Puri',
      },
      {
        name: 'MADIPUR Pocket-03, Paschim Vihar, Madipur, New Delhi',
        address: 'Pocket-03, Paschim Vihar, Madipur, New Delhi',
        location: 'Madipur',
      },
      // Add more dispensaries here based on your data...
    ];
  
    for (const dispensaryData of dispensaries) {
      const location = await Location.findOne({ name: dispensaryData.location });
      if (location) {
        const dispensary = new Dispensary({
          name: dispensaryData.name,
          address: dispensaryData.address,
          location: location._id,
        });
        await dispensary.save();
        console.log('Dispensary created:', dispensary.name);
      }
    }
  }
  
  createDispensaries();
  