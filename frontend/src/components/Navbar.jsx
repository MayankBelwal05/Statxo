import React, { useState } from 'react';
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  const handleLoginAsUser = () => {
    setIsLoggedIn(true);
    setIsAdmin(false);
    navigate('/user');
  };

  const handleLoginAsAdmin = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
    navigate('/admin');
  };

  return (
    <Flex as="nav" p="4" bg="gray.800" color="white">
      <Box>
        <Link to="/">
          <Text fontSize="24px" fontWeight="bold" color="white" ml="8">
            S T A T X O
          </Text>
        </Link>
      </Box>
      <Spacer />
      <Box>
        {isLoggedIn ? (
          <>
            <Button colorScheme="teal" mr="4" onClick={() => navigate(isAdmin ? '/admin' : '/user')}>
              {isAdmin ? 'Admin' : 'User'} Page
            </Button>
            <Button colorScheme="teal" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="teal" mr="4" onClick={handleLoginAsUser}>
              Login as User
            </Button>
            <Button colorScheme="teal" onClick={handleLoginAsAdmin}>
              Login as Admin
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
