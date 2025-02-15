// controllers/financialDetailController.js
import FinancialDetail from '../models/FinancialDetail.js';
import Document from '../models/Document.js';


let formData = {};

export const createDocument = async (req, res) => {
    console.log(req.body,"req.body line-9");
 formData.stepn4 = req.body;


    res.status(200).send('Step n4 data stored');
};


export const getFormData = () => formData;



// export const createFinancialDetail = async (req, res) => {
//     formData.step4 = req.body;
   
//        res.status(200).send('Step 4 data stored');
//    };