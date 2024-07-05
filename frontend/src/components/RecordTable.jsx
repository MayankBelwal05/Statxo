import { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, Select, Button } from '@chakra-ui/react';
import axios from 'axios';

const RecordTable = ({ isAdmin }) => {
  const [records, setRecords] = useState([]);
  const [editedRecords, setEditedRecords] = useState({});

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get('http://localhost:5000/api/records');
      setRecords(response.data);
    };
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
    const updates = Object.keys(editedRecords).map((id) =>
      axios.put(`http://localhost:5000/api/records/${id}`, editedRecords[id])
    );
    await Promise.all(updates);
    const response = await axios.get('http://localhost:5000/api/records');
    setRecords(response.data);
    setEditedRecords({});
  };

  return (
    <Box>
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
            <Tr key={record.id}>
              <Td>{record.id}</Td>
              <Td>
                <Input
                  value={editedRecords[record.id]?.quantity || record.quantity}
                  onChange={(e) => handleChange(e, record.id, 'quantity')}
                />
              </Td>
              <Td>
                <Input
                  value={editedRecords[record.id]?.amount || record.amount}
                  onChange={(e) => handleChange(e, record.id, 'amount')}
                />
              </Td>
              <Td>{record.postingYear}</Td>
              <Td>{record.postingMonth}</Td>
              <Td>
                <Input
                  value={editedRecords[record.id]?.actionType || record.actionType}
                  onChange={(e) => handleChange(e, record.id, 'actionType')}
                />
              </Td>
              <Td>
                <Input
                  value={editedRecords[record.id]?.actionNumber || record.actionNumber}
                  onChange={(e) => handleChange(e, record.id, 'actionNumber')}
                />
              </Td>
              <Td>
                <Input
                  value={editedRecords[record.id]?.actionName || record.actionName}
                  onChange={(e) => handleChange(e, record.id, 'actionName')}
                />
              </Td>
              <Td>
                <Select
                  value={editedRecords[record.id]?.status || record.status}
                  onChange={(e) => handleChange(e, record.id, 'status')}
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
                  value={editedRecords[record.id]?.impact || record.impact}
                  onChange={(e) => handleChange(e, record.id, 'impact')}
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
