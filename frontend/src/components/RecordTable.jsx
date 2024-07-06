import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, Select, Button, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';

const RecordTable = ({ isAdmin }) => {
  const [records, setRecords] = useState([]);
  const [editedRecords, setEditedRecords] = useState({});
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records');
      setRecords(response.data);
    } catch (err) {
      console.error('Error fetching records:', err);
      setError('Failed to fetch records. Please try again.');
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e, id, field) => {
    const { value } = e.target;
    setEditedRecords({
      ...editedRecords,
      [id]: { ...editedRecords[id], [field]: value },
    });
  };

  const handleSave = async () => {
    setError(null);
    try {
      const updates = Object.keys(editedRecords).map((id) => {
        const originalRecord = records.find((rec) => rec._id === id);
        const updatedRecord = { ...originalRecord, ...editedRecords[id] };
        console.log('Sending data:', updatedRecord); 
        return axios.patch(`http://localhost:5000/api/records/${id}`, updatedRecord);
      });
      await Promise.all(updates);
      setEditedRecords({});
      fetchRecords(); 
      setShowAlert(true); 
      setTimeout(() => {
        setShowAlert(false); 
      }, 4000);
    } catch (err) {
      console.error('Error updating records:', err);
      setError('Failed to update records. Please check the data and try again.');
    }
  };

  return (
    <Box>
      {error && (
        <Alert status="error" mb="4">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {showAlert && (
        <Alert status="success" mb="4">
          <AlertIcon />
          Record updated and saved.
        </Alert>
      )}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Quantity</Th>
            <Th>Amount</Th>
            <Th>Posting Year</Th>
            <Th>Posting Month</Th>
            <Th>Action Type</Th>
            <Th>Action Number</Th>
            <Th>Action Name</Th>
            <Th>Status</Th>
            <Th>Impact</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record) => (
            <Tr key={record._id}>
              <Td>{record.id}</Td>
              <Td>
                <Input
                  value={editedRecords[record._id]?.quantity ?? record.quantity}
                  onChange={(e) => handleChange(e, record._id, 'quantity')}
                />
              </Td>
              <Td>
                <Input
                  value={editedRecords[record._id]?.amount ?? record.amount}
                  onChange={(e) => handleChange(e, record._id, 'amount')}
                />
              </Td>
              <Td>{record.postingYear}</Td>
              <Td>{record.postingMonth}</Td>
              <Td>
                <Select
                  value={editedRecords[record._id]?.actionType ?? record.actionType}
                  onChange={(e) => handleChange(e, record._id, 'actionType')}
                >
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                  <option value="Type 3">Type 3</option>
                </Select>
              </Td>
              <Td>
                <Input
                  value={editedRecords[record._id]?.actionNumber ?? record.actionNumber}
                  onChange={(e) => handleChange(e, record._id, 'actionNumber')}
                />
              </Td>
              <Td>
                <Select
                  value={editedRecords[record._id]?.actionName ?? record.actionName}
                  onChange={(e) => handleChange(e, record._id, 'actionName')}
                >
                  <option value="Action 1">Action 1</option>
                  <option value="Action 2">Action 2</option>
                  <option value="Action 3">Action 3</option>
                </Select>
              </Td>
              <Td>
                <Select
                  value={editedRecords[record._id]?.status ?? record.status}
                  onChange={(e) => handleChange(e, record._id, 'status')}
                  isDisabled={!isAdmin}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Select>
              </Td>
              <Td>
                <Input
                  value={editedRecords[record._id]?.impact ?? record.impact}
                  onChange={(e) => handleChange(e, record._id, 'impact')}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button mt="4" colorScheme="teal" onClick={handleSave}>
        Save All
      </Button>
    </Box>
  );
};

export default RecordTable;
