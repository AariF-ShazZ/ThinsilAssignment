import React, { useState } from 'react'

import {
    Box,
    Flex,
    Avatar,
    Button,
    useColorMode,
    Center,
} from '@chakra-ui/react'
import { RxCross2 } from "react-icons/rx";
import {
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Heading,
    InputRightElement,
    Textarea,
    Text,
    Icon,
    Image,
    useToast,
    RadioGroup,
    Radio,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HiShoppingCart } from "react-icons/hi"
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { decreaseCartQuantity, deleteCartItem, increaseCartQuantity } from '../Redux/CartData/actions';
import { logout } from '../Redux/AuthData/action';

interface Props {
    children: React.ReactNode
}

const NavLink = (props: Props) => {
    const { children } = props

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={'#'}>
            {children}
        </Box>
    )
}

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("loginUser")) ;
    const cart = useSelector((store) => store.CartDataReducer.cart) || [];
    // console.log("cart =>", cart);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    // console.log(user?.firstname)
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const userProfile1 = user?.firstname.charAt(0) || "Login"
    const userProfile2 = user?.firstname || "Login"
    const [cartDrawerIsOpen, setCartDrawerIsOpen] = useState(false);

    const openCartDrawer = () => {
        setCartDrawerIsOpen(true);
    };

    const closeCartDrawer = () => {
        setCartDrawerIsOpen(false);
    };

    const handleIncrease = (payload) => {
        dispatch(increaseCartQuantity(payload))
        toast({
            title: "Increase Quantity.",
            description: `Cart Item Quantity Increased Successfully.`,
            status: "success",
            duration: 1000,
            isClosable: true,
        })
    };

    const handleDecrease = (payload) => {
        if (payload.qty > 1) {
            dispatch(decreaseCartQuantity(payload))
            toast({
                title: "Decrease Quantity.",
                description: `Cart Item Quantity Decreased Successfully.`,
                status: "success",
                duration: 1000,
                isClosable: true,
            })
        } else {
            dispatch(deleteCartItem(payload))
            toast({
                title: "Cart Item Deleted.",
                description: `Cart Item Deleted Successfully.`,
                status: "success",
                duration: 1000,
                isClosable: true,
            })
        }
    };

    const handleRemove = (payload) => {
        dispatch(deleteCartItem(payload))
        toast({
            title: "Cart Item Deleted.",
            description: `Cart Item Deleted Successfully.`,
            status: "success",
            duration: 1000,
            isClosable: true,
        })
    };
    let total_final_price = 0;
    let total_original_price = 0;

    const convertToNumber = (str) => {
        if (Number(str)) {
            return Number(str);
        }
        let arr = str.includes(",") ? str.split(",") : [];
        let final_str = arr.reduce((acc, value) => acc + value, "");

        let result = Number(final_str);
        return result;
    };

    cart.length > 0 &&
        cart.forEach((prod) => {
            total_original_price +=
                convertToNumber(prod.original_price) * prod.qty;
            total_final_price += convertToNumber(prod.final_price) * prod.qty;
        });

        const userLogout = () => {
            dispatch(logout())
            toast({
                title: "Logout",
                description: `User Logout Successfully.`,
                status: "success",
                duration: 1000,
                isClosable: true,
            })
            navigate("/login")
        }
    return (
        <>
            <Box
                bg={useColorModeValue('gray.100', 'gray.900')}
                px={[1, 4, 6, 8]} 
                py={[6, 4, 1, 3]}
                position="fixed"
                width="100%"
                zIndex={5}
            >
                <Flex
                    h={16}
                    alignItems="center"
                    justifyContent="space-between"
                    flexDir={['column', 'column', 'row', 'row']} 
                >
                    <Link to={"/"}>
                        <Heading fontSize={['2xl', '3xl', '4xl', '5xl']} color={"blue.300"}>ThinsiL</Heading>
                    </Link>
                    <Flex
                        alignItems="center"
                        flexDir={['column', 'column', 'row', 'row']} 
                        ml={[0, 0, 4, 8]} 
                    >
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            <Box border={"2px solid #dfdfdf"} p={"6%"} borderRadius={"50%"} onClick={openCartDrawer}>
                                <HiShoppingCart cursor={"pointer"} color="#5e6c84" fontSize={"23px"} />
                                <Box
                                    position="absolute"
                                    top={{ base: "50px", sm: "40px", md: "15px", lg: "15px" }}
                                    right={{ base: "125px", sm: "310px", md: "75px", lg: "90px" }}
                                    bg={'blue.400'}
                                    color="white"
                                    borderRadius="50%"
                                    fontSize="12px"
                                    width="20px"
                                    height="20px"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    {cart && cart.length > 0 ? <Text color={"#fff"}>{cart.length}</Text> : 0}

                                </Box>
                            </Box>
                            <Drawer
                                isOpen={cartDrawerIsOpen}
                                placement='right'
                                onClose={closeCartDrawer}
                                size="sm"
                            >
                                <DrawerOverlay />
                                <DrawerContent bg={"#fff"}>
                                    <DrawerCloseButton />
                                    <DrawerHeader color={"gray"} fontWeight={"bold"} fontSize={"25px"}> YOUR CART
                                        ({cart && cart.length > 0 ? cart.length : 0})
                                    </DrawerHeader>
                                    <DrawerBody>
                                        {cart.length && cart.length > 0 ? (
                                            cart.map((item) => {
                                                return (
                                                    <Flex key={item._id} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"} m="1" mb="7" p="2" bg={"gray.500"}>
                                                        <Image boxSize={"75px"} src={item.images[0]} alt="shoe" mr={"3%"} />
                                                        <Box>
                                                            <Flex justifyContent={"space-between"} align="center">
                                                                <Text fontSize={"13px"}>{`${item.name} | ${item.color} | ${item.gender}`}</Text>
                                                                <Icon boxSize={5} ml="5" as={RxCross2}

                                                                    onClick={() => handleRemove(item)}
                                                                    cursor={"pointer"} />
                                                            </Flex>
                                                            <Text as="sup">{item.size}</Text>
                                                            <Flex border={""} w={"100%"} align="center" justifyContent={"space-between"}>
                                                                <Flex bg={""} w={"150px"} align={"center"} justify={"space-evenly"}>
                                                                    <Button colorScheme="blue.400" bg={'blue.400'} color={"#fff"}
                                                                        onClick={() => handleDecrease(item)}
                                                                    >-</Button>
                                                                    <Button colorScheme="blue.400" bg={'blue.400'} color={"#fff"}>{item.qty}</Button>
                                                                    <Button colorScheme="blue.400" bg={'blue.400'} color={"#fff"}
                                                                        onClick={() => handleIncrease(item)}
                                                                    >+</Button>
                                                                </Flex>
                                                                <Flex w={"130px"} m="4%" align="center" justifyContent={"space-between"}>
                                                                    <Text fontSize={"18px"} fontWeight={"bold"}>Rs.{item.final_price}</Text>
                                                                    <Text as="s" fontWeight={"100"}>Rs.{item.original_price}</Text>
                                                                </Flex>
                                                            </Flex>
                                                        </Box>
                                                    </Flex>
                                                );
                                            })
                                        ) : (
                                            <Image src={"https://img.freepik.com/free-vector/man-shopping-supermarket_74855-7612.jpg"}
                                                m={"10%"}
                                                w={"80%"}
                                            />
                                        )}
                                    </DrawerBody>
                                    <Flex display={"flex"} justifyContent={"space-between"} alignItems="center" m={2}>
                                        <Text color={"gray"} fontWeight={"bold"} fontSize={"20px"} textDecoration={"underline"}>SUBTOTAL</Text>
                                        <Flex p={2} display={"flex"} justifyContent={"space-between"} alignItems="center" >
                                            <Text p={2} fontSize={"18px"} fontWeight={800} color="green">Rs {total_final_price}</Text>
                                            <Text p={2} as="s" color={"red"} fontSize={"16px"} fontWeight={600}>Rs {total_original_price}</Text>
                                        </Flex>
                                    </Flex>
                                    <DrawerFooter>
                                        <Button colorScheme='#ff0000' bg={'blue.400'} color={"#fff"} onClick={() => {
                                            navigate("/")
                                            setCartDrawerIsOpen(false);
                                        }} isDisabled={cart.length === 0}>{cart.length > 0 ? "Checkout" : "First Choose Products"}</Button>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Box bg={"gray.500"} w={"50px"} h={"50px"} display={"flex"} alignItems={"center"} justifyContent={"center"} borderRadius={"50%"} color={"whatsapp.100"}>{userProfile1}</Box>
                                
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>

                                        <Box bg={"gray.500"} w={"auto"} h={"50px"} display={"flex"} alignItems={"center"} justifyContent={"center"} borderRadius={"50%"} color={"whatsapp.100"} p={"3%"}>{userProfile2}</Box>
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{"Username"}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                        <Link to={"/register"}>
                                    <MenuItem>
                                            Register
                                    </MenuItem>
                                        </Link>
                                        <Link to={"/login"}>
                                    <MenuItem>
                                            Login
                                    </MenuItem>
                                        </Link>
                                    <MenuItem onClick={() => userLogout()}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>

                    </Flex>
                </Flex>
            </Box>
        </>
    )
}