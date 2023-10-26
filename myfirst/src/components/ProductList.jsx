import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getShoes } from "../Redux/AppData/action";
import {
  Box
} from '@chakra-ui/react'
import { Link, useLocation, useSearchParams } from "react-router-dom";
const ProductList = () => {
  const location = useLocation();
  //console.log(location.search);

  const [searchParams] = useSearchParams();
  const shoesData = useSelector((store) => store.AppDataReducer.shoes) || [];
  console.log("shoesData =>",shoesData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location || shoesData.length === 0) {
      const getShoesParams = {
        params: {
          gender: searchParams.getAll("gender")
        },
      };
      dispatch(getShoes(getShoesParams));
    }
  }, [shoesData.length, dispatch, location.search]);
  return (
    <>
      {shoesData.length > 0 &&
        shoesData.map((singlebook) => {
          return (
            <Box w={"300px"} key={singlebook.id}>
              <Card bookdata={singlebook} />
            </Box>
          );
        })}
    </>
  );
};

export default ProductList;
