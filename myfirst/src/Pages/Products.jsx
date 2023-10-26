import React from "react";
import FilterComp from "../components/FilterComp";
import { Box, Button, Center, Flex, Grid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ProductList from "../components/ProductList";
const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)
  return (
    <div>
      <Flex  py={{ base: "23%",sm:"23%", md: "10%", lg: "10%" }}  px={5} direction={{ base: "column", md: "row", lg: "row" }} 
      
      >
        <Box w={"300px"}>
          <Box p={'4'} w={"20%"} bg='' display={{ base: 'none', md: "inline", lg: "inline" }}>
            <FilterComp />
          </Box>
          <Box bg=""  h={"400px"}  display={{ base: 'inline', md: "none", lg: "none" }} alignItems={"center"} justifyContent={"center"}>
            <Button onClick={onOpen} color={"#fff"} bg={"#ff0000"} mt={{ base: "23%",sm:"5%"}}>
              Filter Here
            </Button>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent bg={"#fff"}>
                <ModalHeader color={"gray"}>Filter Modal</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FilterComp />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='#ff0000' bg={"#ff0000"} color={"#fff"} mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
        <Grid  
        w={"100%"}
        display={"grid"}
        templateColumns="repeat(auto-fit, minmax(300px, max-content))"
        gap={10}
        justifyContent={"Center"}
        >
          <ProductList />
        </Grid>
      </Flex>
    </div>
  );
};

export default Products;
