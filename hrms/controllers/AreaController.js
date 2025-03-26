// controllers/businessController.js

import Area from '../models/Area.js';
export const getAreas = async (req, res) => {
    try {
        let area = await Area.find({});
        console.log(area);
      res.status(200).send({"error":true,area:area});
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve Locations', error });
    }
  };

  
  