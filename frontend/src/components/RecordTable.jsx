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
      const response = await axios.get('https://statxo-013o.onrender.com/api/records');
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
        return axios.patch(`https://statxo-013o.onrender.com/api/records/${id}`, updatedRecord);
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
    <Box p="6" bg="gray.100" borderRadius="md" boxShadow="md">
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
      <Table variant="striped" colorScheme="teal">
        <Thead bg="teal">
          <Tr>
            <Th color="white" fontSize="16px">ID</Th>
            <Th color="white" fontSize="16px">Quantity</Th>
            <Th color="white" fontSize="16px">Amount</Th>
            <Th color="white" fontSize="16px">Posting Year</Th>
            <Th color="white" fontSize="16px">Posting Month</Th>
            <Th color="white" fontSize="16px">Action Type</Th>
            <Th color="white" fontSize="16px">Action Number</Th>
            <Th color="white" fontSize="16px">Action Name</Th>
            <Th color="white" fontSize="16px">Status</Th>
            <Th color="white" fontSize="16px">Impact</Th>
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
                  bg="white"
                  width="50%"
                />
              </Td>
              <Td>
                <Input
                  value={editedRecords[record._id]?.amount ?? record.amount}
                  onChange={(e) => handleChange(e, record._id, 'amount')}
                  bg="white"
                  width="50%"
                />
              </Td>
              <Td>{record.postingYear}</Td>
              <Td>{record.postingMonth}</Td>
              <Td>
                <Select
                  value={editedRecords[record._id]?.actionType ?? record.actionType}
                  onChange={(e) => handleChange(e, record._id, 'actionType')}
                  bg="white"
                  width="140%"
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
                  bg="white"
                  width="50%"
                />
              </Td>
              <Td>
                <Select
                  value={editedRecords[record._id]?.actionName ?? record.actionName}
                  onChange={(e) => handleChange(e, record._id, 'actionName')}
                  bg="white"
                  width="140%"
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
                  bg="white"
                  width="140%"
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
                  bg="white"
                  width="80%"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button mt="4" mx="auto" display="block" colorScheme="teal" onClick={handleSave}>
        Save All
      </Button>
    </Box>
  );
};

export default RecordTable;
