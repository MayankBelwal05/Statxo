import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import RecordTable from '../components/RecordTable';
import RecordForm from '../components/RecordForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserPage = () => {
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    console.log('Form Data:', formData); // Log the form data
    try {
      const response = await axios.post('http://localhost:5000/api/records', formData);
      console.log('Record saved successfully');
      navigate('/user');
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  return (
    <Box>
      <Box p="4">
        {isAddingRecord ? (
          <RecordForm onSubmit={handleSubmit} onClose={() => setIsAddingRecord(false)} />
        ) : (
          <Button colorScheme="teal" onClick={() => setIsAddingRecord(true)}>
            Add Record
          </Button>
        )}
        <RecordTable isAdmin={false} />
      </Box>
    </Box>
  );
};

export default UserPage;
