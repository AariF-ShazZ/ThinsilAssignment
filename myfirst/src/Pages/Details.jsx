import { getShoes } from "../Redux/AppData/action";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, Flex, HStack, Heading, Image, Text, VStack, useToast } from '@chakra-ui/react';
import { BsFillHeartFill } from "react-icons/bs"
import { addToCart } from "../Redux/CartData/actions";

const Details = () => {
  const { id } = useParams();
  const shoes = useSelector((store) => store.AppDataReducer.shoes) || [];
  // console.log(shoes);
  const [currentData, setCurrentData] = useState({});
  const dispatch = useDispatch();
  const toast = useToast()
  useEffect(() => {
    if (shoes.length === 0) {
      dispatch(getShoes());
    }
  }, [shoes.length, dispatch]);
  useEffect(() => {
    if (id) {
      const singleData = shoes.find((item) => item.id === Number(id));
      singleData && setCurrentData(singleData);
    }
  }, [id, shoes]);

  const images = currentData.images || [];
  const sizes = currentData.sizes || [];
  const gender = currentData.gender || '';
  const name = currentData.name || '';
  const finalPrice = currentData.final_price || 0;
 
  const [size, setSize] = useState(null)
  

  const handleAddToCart = () => {
    let payload = {
      ...currentData, size
    }

    // console.log("cart payload size=>", size, payload)
    dispatch(addToCart(payload))
    toast({
      title: "Add To Cart.",
      description: `Product Added To The Cart Successfully.`,
      status: "success",
      duration: 1000,
      isClosable: true,
    })
  }

  return (
    <>
      <Box w="100%"  p="4% 2%"  py={{base:"6%",sm: "4%",md:"2%",lg:"2%"}}>
        <Flex w="70%" m="auto" bg="#fff" my={{base:"50%",sm: "20%",md:"10%",lg:"6%"}} boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;" borderRadius={"10px"} display={{ base: "column", sm: "column", md: "column", lg: "flex" }} p={{ base: "2%", sm: "2%", md: "3%", lg: "4%" }}>
          <Box w="100%" bg="">
            <Flex alignItems="center" justifyContent="space-between" p="1%" display={{ base: "column", sm: "column", md: "flex", lg: "flex" }}>
              <Image src={images[0]} w="100%" boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px;" borderRadius={"10px"} display={{ base: "100px", sm: "200px", md: "400px", lg: "500px" }} />
            </Flex>
            <Flex p={"2% 1%"} m={"auto"} alignItems={"center"} justifyContent={"space-evenly"}
              display={{ base: "100px", sm: "200px", md: "400px", lg: "800px" }} >
              {sizes.length > 0 && sizes.map((ele, i) => (
                <Button
                  key={i}
                  onClick={() => setSize(ele)}
                  bg={'blue.400'}
                  colorScheme='#ff0000'
                  boxShadow="0px 7px 4px rgba(255, 0, 0, 0.3)" 
                  color="#fff" 
                  m={{ base: "2% 1%", sm: "2% 1%", md: "2% 1%", lg: "1% 1%" }}

                >
                  {ele}
                </Button>
              ))}
            </Flex>
          </Box>
          <Box bg={""} w={"100%"} textAlign={"left"} ml={"2%"} pl={"3%"}>
            <Text color={"gray"}>{gender}</Text>
            <Heading color={"gray.500"}>{name}</Heading>
            <Flex p={"1% 2%"} alignItems={"center"} justifyContent={"space-evenly"} w={{ base: "190px" }} bg={""} >
              <Heading ml={{ base: "-22%", sm: "-22%", md: "-9%", lg: "-7%" }} color={"red"} fontSize={{ base: "15px", sm: "16px", md: "23px", lg: "23px" }}>Rs. {finalPrice}</Heading>
              <Heading fontSize={{ base: "12px", sm: "13px", md: "19px", lg: "19px" }} as="strike" color={"#db3f3f"}>
                Rs. {currentData.original_price}
              </Heading>
            </Flex>
            <Text color={"gray"}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita modi mollitia, itaque fugiat quisquam facere, animi atque nesciunt debitis tempora error fugit similique </Text>
            <Flex bg={""} m={{ base: "3%", sm: "2%", md: "8%", lg: "9%" }} alignItems={"center"} justifyContent={"center"} p={{ base: "2% 8% 2% 0%", sm: "2%", md: "2%", lg: "0" }} >
              <Button
                colorScheme='#ff0000'
                color={"#fff"}
                bg={'blue.400'}
                boxShadow="0px 8px 4px rgba(255, 0, 0, 0.3)"
                m={4}
                p={5}
                isDisabled={!size}
                onClick={() => handleAddToCart()}
                fontSize={{ base: "8px", sm: "12px", md: "15px", lg: "15px" }}
                w={{ base: "100px", sm: "150px", md: "180px", lg: "180px" }}
              >
                {size ? "ADD TO CART" : "PLEASE SELECT A SIZE"}
              </Button>
              <Button colorScheme='#ff0000' bg={'blue.400'} boxShadow="0px 8px 4px rgba(255, 0, 0, 0.3)" ><BsFillHeartFill color='#fff' /></Button>
            </Flex>

          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Details;
