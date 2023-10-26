import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../Redux/AuthData/action";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const comingFrom = location.state?.data || "/";
  const toast =useToast()

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user")) || [];
    
    // Check if the stored user matches the login credentials
    const user = storedUser.find((item) => item.email === email);
  
    if (user && user.password === password) {
      // Dispatch action to update Redux state
      console.log("Success");
      dispatch(login(user));
      toast({
        title: "Login Success",
        description: `Login Successfull`,
        status: "success",
        duration: 1000,
        isClosable: true,
      })
      navigate(comingFrom, { replace: true });
    } else {
      // Handle invalid login
      toast({
        title: "Login Failed",
        description: `Invalid Credential`,
        status: "error",
        duration: 1000,
        isClosable: true,
      })
    }
  };
  

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      pt={{base:"20%",sm:"20%",md:"10%",lg:"10%"}}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

        <form onSubmit={handleLogin}>
          <Stack align={'center'}>
            <Heading fontSize={"4xl"} mb={"3%"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4} >
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword( e.target.value )} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon/>}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  New user? <Link color="blue" to={`/register`}>Register</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex >
  )
}