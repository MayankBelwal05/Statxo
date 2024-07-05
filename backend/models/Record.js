const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  postingYear: { type: Number, required: true },
  postingMonth: { type: String, required: true },
  actionType: { type: String, required: true },
  actionNumber: { type: String, required: true },
  actionName: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  impact: { type: String, required: true },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
