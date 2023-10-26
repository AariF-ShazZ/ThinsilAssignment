'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { registerUser } from '../Redux/AuthData/action';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({ firstname: '', lastname: '', email: '', password: '' });
    const [userArr, setUserArr] = useState([]);
    const toast = useToast();
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')) || [];
        setUserArr(storedUser);
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        // Update userArr using the callback form of setUserArr
        let newArr = [...userArr, userData];
        setUserArr(newArr);
        // Save updated userArr to localStorage
        localStorage.setItem('user', JSON.stringify(newArr));
        // Dispatch action to update Redux state
        dispatch(registerUser(userData));
        toast({
            title: 'Register',
            description: `Your account has been created!`,
            status: 'success',
            duration: 1000,
            isClosable: true,
        });
    };

    console.log("userArr =>", userArr)
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>

            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <form onSubmit={handleRegister}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>

                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Firstname"
                                            value={userData.firstname}
                                            onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="LastName"
                                            value={userData.lastname}
                                            onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={userData.password}
                                        onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type='submit'
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link color={'blue.400'} to={`/login`} fontSize={"20px"}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    )
}