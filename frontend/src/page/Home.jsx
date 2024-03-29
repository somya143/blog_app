import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import "./home.css";

const Home = () => {
  return (
    <Box h={"100vh"} w={"100vw"} backgroundImage={'https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
     backgroundRepeat={"no-repeat"} 
     backgroundSize={"cover"}
     width="100%"
    height={{ base: "100vh", sm: "100vh", md: "100vh", lg: "100vh" }} >
    <Box width={"60%"} height={"500px"} margin={"auto"}  >
        <Text pt={"3rem"} fontSize={["2.2rem","2.6rem","3rem","3.3rem"]} fontWeight={700} fontFamily={"sans-serif"} color={"orange"}>Welcome to the Blog Application</Text>
        <Text fontSize={"1.5rem"} color={"orange"}>Register yourself to begin</Text>
         <Box display={"flex"} justifyContent={"space-around"} mt={"8rem"} className='homeBtn' >
            <Button variant={"ghost"} backgroundColor={"green.300"} textDecoration={"underline"}> <Link to="/register">Register Yourself</Link> </Button>
            <Button variant={"ghost"} backgroundColor={"green.300"} textDecoration={"underline"}> <Link to="/login">Login and continue.</Link> </Button>
            <Button variant={"ghost"} backgroundColor={"green.300"} textDecoration={"underline"}> <Link to="/blogs">Read Blogs</Link> </Button>
         </Box>
    </Box>
    </Box>
  )
}

export default Home