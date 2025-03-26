import PunchLog from "../models/PunchLog.js";
import axios from "axios";
import getNextEmployeeCode from "../utils/getNextEmployeeCode.js";
import Company from "../models/Company.js";

const getAttendanceReport = async (req, res, next) => {
    try {
        const { from, to, page = 1, limit = 10 } = req.query;
        
        const skip = (page - 1) * limit;
        const matchStage = {};

        // If both 'from' and 'to' dates are provided, add a match condition
        if (from && to) {
            matchStage.datePart = { $gte: from, $lte: to };
        }

        // Use the aggregation pipeline to extract and filter based on the date part of InTime
        const attendanceData = await PunchLog.aggregate([
            {
                $addFields: {
                    datePart: { $substr: ["$InTime", 0, 10] } // Extract the date part as a string
                }
            },
            {
                $match: matchStage
            },
            {
                $skip: skip
            },
            {
                $limit: parseInt(limit)
            }
        ]);

        // Get the total count for the query using the same aggregation pipeline
        const totalCount = await PunchLog.aggregate([
            {
                $addFields: {
                    datePart: { $substr: ["$InTime", 0, 10] }
                }
            },
            {
                $match: matchStage
            },
            {
                $count: "total"
            }
        ]);

        const total = totalCount.length > 0 ? totalCount[0].total : 0;

        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            data: attendanceData,
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching attendance data', error });
    }
};


const createAttendanceReport = async (req,res,next) => {
    try {
        // Fetch data from the API
    const response = await axios.get('https://api.gtel.in/essl/api/v1/attendance');
    //console.log(response)
// Check if the response contains data
if (response.data.attendance && response.data.attendance.length > 0) {
  const punchLogs = response.data.attendance.map(record => ({
    EmployeeCode: record.EmployeeCode,
    EmployeeName: record.EmployeeName,
    AttendanceDate: record.AttendanceDate,
    InTime: record.InTime,
    OutTime: record.OutTime,
    PunchRecords: record.PunchRecords,
    Status: record.Status,
    ResigStatus:record.ResigStatus,
    P1Status: record.P1Status,
    P2Status: record.P2Status,
    P3Status: record.P3Status,
    MissedInPunch: record.MissedInPunch,
    BeginTime: record.BeginTime,
    EndTime: record.EndTime
    // Map other fields as needed
  }));

  // Save data to MongoDB
  //await PunchLog.insertMany(punchLogs);
  //console.log(punchLogs);
  try {
    // Get unique names from the items to insert
    const empCode = punchLogs.map(item => item.EmployeeCode);
    
    // Fetch existing records with those names
    const existingItems = await PunchLog.find({ EmployeeCode: { $in: empCode } });
    //console.log(existingItems);
    // Create a map of existing items for quick lookup
    const existingItemsMap = new Map(existingItems.map(item => [item.EmployeeCode, item]));
    //console.log(existingItemsMap)
    // Filter out items that already exist in the database
    const filteredItems = punchLogs.filter(item => {
      if (existingItemsMap.has(item.EmployeeCode)) {
        const existingItem = existingItemsMap.get(item.EmployeeCode);
        //console.log(existingItem.AttendanceDate)
        // Retain the item only if its date is later than the existing item's date
        //console.log(new Date(item.AttendanceDate))
        return item.AttendanceDate > existingItem.AttendanceDate;
      }
      return true;  // Insert if it doesn't exist in the map
    });

    // Insert the filtered items into the database
    const result = await PunchLog.insertMany(filteredItems);
    //console.log('Inserted documents:', result.EmployeeCode);
    const records = [{phoneNumber:'918377914602@c.us',message:"Punch In Test"},{phoneNumber:'918860606963@c.us',message:"Punch In Test"},{phoneNumber:'918860606960@c.us',message:"Punch In Test"}]
    const empCode1 = result.map(item => ({EmployeeCode:item.EmployeeCode}));
    console.log(empCode1);
    for (const record of records) {
      try {
        const response = await fetch('https://api.gtel.in/wa1/hrms/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(record)
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Response:', data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    res.status(201).send({"error":false,"message":"Attendance Created Successfully"})
  } catch (err) {
    if (err.code === 11000) {
      console.log('Duplicate key error:', err.message);
    } else {
      console.error('Error inserting documents:', err);
    }
  }
  //console.log(`${punchLogs.length} records saved to MongoDB`);
} else {
  console.log('No records to save');
}
    } catch (error) {
        console.error('Error fetching or inserting data:', error);

    }
}
const nextEmpCode = async (req,res,next) => {

 const { prefix } = req.query; // Accept a query parameter like 'WIBRO' or 'GTEL'

  const result = await Company.find();
const alias = result.map((al)=>al.alias);
  if (!alias.includes(prefix)) {
    return res.status(400).json({ message: `Invalid prefix. Use  this ${alias}` })
  }


  try {
    const nextCode = await getNextEmployeeCode(prefix);
    return res.json({ nextEmployeeCode: nextCode });
  } catch (error) {
    return res.status(500).json({ message: 'Error generating next employee code', error });
  }
}


export {getAttendanceReport,createAttendanceReport,nextEmpCode};
