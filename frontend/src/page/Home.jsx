import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box h={"100vh"} w={"100vw"} backgroundImage={'https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} >
    <Box width={"60%"} height={"500px"} margin={"auto"}  >
        <Text pt={"3rem"} fontSize={"3.2rem"} fontWeight={700} fontFamily={"sans-serif"} color={"orange"}>Welcome to the Blog Application</Text>
        <Text fontSize={"1.5rem"} color={"orange"}>Register yourself to begin</Text>
         <Box display={"flex"} justifyContent={"space-around"} mt={"8rem"}>
            <Button variant={"ghost"} backgroundColor={"green.300"} textDecoration={"underline"}> <Link to="/register">Register Yourself</Link> </Button>
            <Button variant={"ghost"} backgroundColor={"green.300"} textDecoration={"underline"}> <Link to="/login">If already an user, then login and continue.</Link> </Button>
         </Box>
    </Box>
    </Box>
  )
}

export default Home