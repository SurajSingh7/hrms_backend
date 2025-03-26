// controllers/businessController.js

import Location from '../models/Location.js';

import Dispensary from '../models/Despensary.js';
import mongoose from 'mongoose';
export const getLocation = async (req, res) => {
    try {
        let location = await Location.find({});
        console.log(location)
      res.status(200).send({"error":true,locations:location});
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve Locations', error });
    }
  };

  export const getDispensary = async (req, res) => {
    try {
        

        const dispid = new mongoose.Types.ObjectId(req.params.id);
        //console.log(typeof dispid); // Ensure it's an 'object'
        
        let disp = await Dispensary.find({location:req.params.id});
        if (!disp) {
            return res.status(404).json({ error: true, message: 'Dispensary not found' });
        }

        res.status(200).send({ error: false, disp: disp });
    } catch (error) {
        console.error('Error:', error.message); // Log the error message for debugging
        res.status(500).json({ message: 'Failed to retrieve Dispensary', error });
    }
};

  