const express = require('express');
const { getRecords, createRecord, updateRecord } = require('../controllers/recordController');

const router = express.Router();

router.get('/records', getRecords);
router.post('/records', createRecord);
router.patch('/records/:id', updateRecord);

module.exports = router;
