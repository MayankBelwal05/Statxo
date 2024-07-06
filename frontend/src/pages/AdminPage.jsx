import React, { useState, useEffect } from 'react';
import { Box, Button, Alert, AlertIcon } from '@chakra-ui/react';
import RecordTable from '../components/RecordTable';
import RecordForm from '../components/RecordForm';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  const [records, setRecords] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords(); 
  }, []);

  const handleSaveRecord = async (formData) => {
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
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000); 
      setIsAddingRecord(false); 
      await fetchRecords(); 
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/records');
      if (!response.ok) {
        throw new Error('Failed to fetch records');
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  return (
    <Box>
      <Box p="4">
        {isAddingRecord ? (
          <RecordForm onSubmit={handleSaveRecord} onClose={() => setIsAddingRecord(false)} />
        ) : (
          <Button mb="4" mx="auto" display="block" colorScheme="teal" onClick={() => setIsAddingRecord(true)}>
            Add Record
          </Button>
        )}
        
        {showAlert && (
          <Alert status="success" mt="4">
            <AlertIcon />
            New record added by admin!
          </Alert>
        )}
        <RecordTable isAdmin={true} records={records} />
      </Box>
    </Box>
  );
};

export default AdminPage;
