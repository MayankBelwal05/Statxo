import { useState } from 'react';
import { Box, Input, Button, VStack } from '@chakra-ui/react';
import axios from 'axios';

const RecordForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    quantity: '',
    amount: '',
    postingYear: '',
    postingMonth: '',
    actionType: '',
    actionNumber: '',
    actionName: '',
    status: 'Pending',
    impact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/records', formData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing="4">
        <Input name="id" placeholder="ID" value={formData.id} onChange={handleChange} />
        <Input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
        <Input name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
        <Input name="postingYear" placeholder="Posting Year" value={formData.postingYear} onChange={handleChange} />
        <Input name="postingMonth" placeholder="Posting Month" value={formData.postingMonth} onChange={handleChange} />
        <Input name="actionType" placeholder="Action Type" value={formData.actionType} onChange={handleChange} />
        <Input name="actionNumber" placeholder="Action Number" value={formData.actionNumber} onChange={handleChange} />
        <Input name="actionName" placeholder="Action Name" value={formData.actionName} onChange={handleChange} />
        <Input name="impact" placeholder="Impact" value={formData.impact} onChange={handleChange} />
        <Button type="submit" colorScheme="teal">
          Add Record
        </Button>
      </VStack>
    </Box>
  );
};

export default RecordForm;
