import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import RecordTable from '../components/RecordTable';
import RecordForm from '../components/RecordForm';
import axios from 'axios';

const UserPage = () => {
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleAddRecord = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/records', formData);
      console.log('Record added successfully:', response.data);
      setRecords((prevRecords) => [...prevRecords, response.data]); 
      setIsAddingRecord(false); 
      alert('Record added successfully');
      fetchRecords();
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <Box>
      <Box p="4">
        {isAddingRecord ? (
          <RecordForm onSubmit={handleAddRecord} onClose={() => setIsAddingRecord(false)} />
        ) : (
          <Button mb="4" colorScheme="teal" onClick={() => setIsAddingRecord(true)} mx="auto" display="block">
          Add Record
        </Button>
        
        )}
        <RecordTable records={records} isAdmin={false} />
      </Box>
    </Box>
  );
};

export default UserPage;
