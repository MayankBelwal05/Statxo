import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const RecordForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    quantity: '',
    amount: '',  
    postingYear: 2024,
    postingMonth: 'July',
    actionType: 'Type 1', // Default value for actionType
    actionNumber: '',
    actionName: 'Action 1', // Default value for actionName
    impact: 'Low',
    status: 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box p="4">
      <form onSubmit={handleSubmitForm}>
        <FormControl>
          <FormLabel>ID</FormLabel>
          <NumberInput value={formData.id} onChange={(value) => handleNumberChange(value, 'id')}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <NumberInput value={formData.quantity} onChange={(value) => handleNumberChange(value, 'quantity')}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <NumberInput value={formData.amount} onChange={(value) => handleNumberChange(value, 'amount')}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Posting Year</FormLabel>
          <Input type="text" name="postingYear" value={formData.postingYear} onChange={handleChange} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>Posting Month</FormLabel>
          <Input type="text" name="postingMonth" value={formData.postingMonth} onChange={handleChange} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>Action Type</FormLabel>
          <Select name="actionType" value={formData.actionType} onChange={handleChange}>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Type 3">Type 3</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Action Number</FormLabel>
          <Input type="text" name="actionNumber" value={formData.actionNumber} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Action Name</FormLabel>
          <Select name="actionName" value={formData.actionName} onChange={handleChange}>
            <option value="Action 1">Action 1</option>
            <option value="Action 2">Action 2</option>
            <option value="Action 3">Action 3</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Impact</FormLabel>
          <Select name="impact" value={formData.impact} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </FormControl>
        <Button mt="4" colorScheme="teal" type="submit">
          Save Record
        </Button>
        <Button ml="4" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default RecordForm;
