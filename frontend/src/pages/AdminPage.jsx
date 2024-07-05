import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import RecordTable from '../components/RecordTable';
import RecordForm from '../components/RecordForm';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to save record');
      }
      console.log('Record saved successfully');
      navigate('/admin');
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
        <RecordTable isAdmin={true} />
      </Box>
    </Box>
  );
};

export default AdminPage;
