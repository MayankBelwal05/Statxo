import React, { useState } from 'react';
import {
  Box,
  Flex,
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
import axios from 'axios';

const RecordForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    quantity: '',
    amount: '',
    postingYear: 2024,
    postingMonth: 'July',
    actionType: 'Type 1',
    actionNumber: '',
    actionName: 'Action 1',
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      await fetchRecords();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get('https://statxo-013o.onrender.com/api/records');
      console.log('Fetched records:', response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  return (
    <Box mb="4" p="4" w="45%" mx="auto"  boxShadow="lg" borderRadius="20px" >
      <form onSubmit={handleSubmitForm}>
        <FormControl mb="2">
          <FormLabel>ID</FormLabel>
          <NumberInput value={formData.id} onChange={(value) => handleNumberChange(value, 'id')}>
            <NumberInputField  />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb="2">
          <FormLabel>Quantity</FormLabel>
          <NumberInput value={formData.quantity} onChange={(value) => handleNumberChange(value, 'quantity')}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb="2">
          <FormLabel>Amount</FormLabel>
          <NumberInput value={formData.amount} onChange={(value) => handleNumberChange(value, 'amount')}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb="2">
          <FormLabel>Posting Year</FormLabel>
          <Input type="text" name="postingYear" value={formData.postingYear} onChange={handleChange} readOnly />
        </FormControl>
        <FormControl mb="2">
          <FormLabel>Posting Month</FormLabel>
          <Input type="text" name="postingMonth" value={formData.postingMonth} onChange={handleChange} readOnly />
        </FormControl>
        <FormControl mb="2">
          <FormLabel>Action Type</FormLabel>
          <Select name="actionType" value={formData.actionType} onChange={handleChange} w="100%">
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Type 3">Type 3</option>
          </Select>
        </FormControl>
        <FormControl mb="2">
          <FormLabel>Action Number</FormLabel>
          <Input type="text" name="actionNumber" value={formData.actionNumber} onChange={handleChange}  />
        </FormControl>
        <FormControl mb="2">
          <FormLabel>Action Name</FormLabel>
          <Select name="actionName" value={formData.actionName} onChange={handleChange} w="100%">
            <option value="Action 1">Action 1</option>
            <option value="Action 2">Action 2</option>
            <option value="Action 3">Action 3</option>
          </Select>
        </FormControl>
        <FormControl mb="2">
          <FormLabel>Impact</FormLabel>
          <Select name="impact" value={formData.impact} onChange={handleChange} w="100%">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </FormControl>
        <Flex justify="center" mt="4">
  <Button colorScheme="teal" type="submit">
    Save Record
  </Button>
  <Button ml="4" colorScheme="red" onClick={onClose}>
    Cancel
  </Button>
</Flex>
      </form>
    </Box>
  );
};

export default RecordForm;
