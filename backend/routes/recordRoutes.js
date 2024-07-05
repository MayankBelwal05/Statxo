const express = require('express');
const { getRecords, createRecord, updateRecord } = require('../controllers/recordController');

const router = express.Router();

router.get('/records', getRecords);
router.post('/records', createRecord);
router.put('/records/:id', updateRecord);

module.exports = router;
