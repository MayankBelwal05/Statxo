const Record = require('../models/Record');

const getRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ updatedAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const createRecord = async (req, res) => {
  console.log('Request Body:', req.body); 
  const record = new Record(req.body);
  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error creating record:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecord);
    console.log('Updated record:', updatedRecord);
  } catch (error) {
    console.error('Error updating record:', error.message); 
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getRecords, createRecord, updateRecord };
