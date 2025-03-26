// controllers/businessController.js
import Business from '../models/Company.js';

export const submitBusiness = async (req, res) => {
  try {
    const businessData = req.body;
    const newBusiness = new Business(businessData);
    await newBusiness.save();
    res.status(201).json({ message: 'Business data submitted successfully', data: newBusiness });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit business data', error });
  }
};


export const getAllBusinesses = async (req, res) => {
    try {
      const businesses = await Business.find();
      res.status(200).json(businesses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve businesses', error });
    }
  };