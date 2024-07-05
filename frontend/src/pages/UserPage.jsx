import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import RecordTable from '../components/RecordTable';
import RecordForm from '../components/RecordForm';

const UserPage = () => {
  const [isAddingRecord, setIsAddingRecord] = useState(false);

  return (
    <Box>
      <Box p="4">
        {isAddingRecord ? (
          <RecordForm onClose={() => setIsAddingRecord(false)} />
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
