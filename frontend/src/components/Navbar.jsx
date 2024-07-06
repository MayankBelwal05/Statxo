import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, isAdmin, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <Flex as="nav" p="4" bg="gray.800" color="white">
      <Box>
        <Link to="/"><h1>Home</h1></Link>
      </Box>
      <Spacer />
      <Box>
        {isLoggedIn ? (
          <>
            <Button colorScheme="teal" mr="4" onClick={() => navigate(isAdmin ? '/admin' : '/user')}>
              {isAdmin ? 'Admin' : 'User'} Page
            </Button>
            <Button colorScheme="teal" onClick={handleLogoutClick}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login-user">
              <Button colorScheme="teal" mr="4">
                Login as User
              </Button>
            </Link>
            <Link to="/login-admin">
              <Button colorScheme="teal">Login as Admin</Button>
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
