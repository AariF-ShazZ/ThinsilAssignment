import React, { useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Checkbox,
  CheckboxGroup,
  VStack,
  Heading,
  Flex
} from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
const FilterCom = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.getAll("gender")
  const [category, setCategory] = useState(initialCategory || [])

  const handleFilterCheckbox = (e) => {
    // console.log(e.target.value);
    const newCategories = [...category]
    if (newCategories.includes(e.target.value)) {
      newCategories.splice(newCategories.indexOf(e.target.value), 1)
    } else {
      newCategories.push(e.target.value)
    }
    setCategory(newCategories)
  }

  useEffect(() => {
    let params = {}
    params.gender = category
    setSearchParams(params)
  }, [category, setSearchParams])
  
  return (
    <>
      <Box w={"100%"} h={"400px"} bg={"gray.200"} boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px;"} p={"10% 8%"}>
        <Box mb={"10%"}>
          <Heading as='legend' fontSize={"25px"} color={"gray"} mb={"6%"}>
            Categories
          </Heading>
          <CheckboxGroup defaultValue='Itachi' >
            <VStack spacing='10px' textAlign={"start"} color={"gray.500"} >
              <Flex w={"150px"}  align={"center"}  justify={"start"}>
                <Flex w={"60px"} bg={""} justify={"space-between"}>
                <input
                  type="checkbox"
                  value={"MEN"}
                  checked={category.includes("MEN")}
                  onChange={handleFilterCheckbox} />
                <label htmlFor="">MEN</label>
                </Flex>
              </Flex>
              <Flex w={"150px"} bg={""} align={"center"}  justify={"start"}>
               <Flex w={"88px"} bg={""} justify={"space-between"}>
               <input
                  type="checkbox"
                  value={"WOMEN"}
                  checked={category.includes("WOMEN")}
                  onChange={handleFilterCheckbox} />
                <label htmlFor="">WOMEN</label>
               </Flex>
              </Flex>
              <Flex w={"150px"} bg={""} align={"center"}  justify={"start"}>
              <Flex w={"60px"} bg={""} justify={"space-between"}>
              <input
                  type="checkbox"
                  value={"KIDS"}
                  checked={category.includes("KIDS")}
                  onChange={handleFilterCheckbox} />
                <label htmlFor="">KIDS</label>
              </Flex>
               
              </Flex>
            </VStack>
          </CheckboxGroup>
        </Box>
      
      </Box>
    </>
  )
}

export default FilterCom