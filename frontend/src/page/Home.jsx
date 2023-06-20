import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box height={"640px"} backgroundColor={"teal.700"} boxShadow={"rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px;"}>
    <Box backgroundColor={"white"} width={"60%"} height={"500px"} margin={"auto"} mt={"30px"} boxShadow= "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px">
        <Text pt={"3rem"} fontSize={"3.2rem"} color={"teal.400"}>Welcome to the Blog Application!!!</Text>
        <Text fontSize={"1.5rem"} color={"teal.400"}>Register yourself to begin</Text>
         <Box display={"flex"} justifyContent={"space-around"} mt={"8rem"}>
            <Button variant={"ghost"} textDecoration={"underline"}> <Link to="/register">Register Yourself</Link> </Button>
            <Button variant={"ghost"} textDecoration={"underline"}> <Link to="/login">If already an user, then login and continue.</Link> </Button>
         </Box>
    </Box>
    </Box>
  )
}

export default Home