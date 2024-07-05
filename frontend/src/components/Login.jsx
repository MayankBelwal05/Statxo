import { Center, Button, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (admin) => {
    onLogin(admin);
    navigate(admin ? '/admin' : '/user');
  };

  return (
    <Center h="100vh">
      <VStack spacing="8">
        <Heading>Login</Heading>
        <Button colorScheme="teal" onClick={() => handleLogin(false)}>
          Login as User
        </Button>
        <Button colorScheme="teal" onClick={() => handleLogin(true)}>
          Login as Admin
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;
