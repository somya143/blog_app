import React from 'react';
import { Box,Text } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box 
    float={"left"} 
    minW={{'lg':"20vw" , 'md':"30vw"}} 
    h="100vh"
    position={"relative"}
    border={"1px solid black"}
    bg={"gray.700"}
    overflowY={"scroll"}
    display={["none","none","block","block"]}
    top="0"
    left="0"
    >
    <Box border={"1px solid"} p={4} color={"white"}>
        <Box p={6} position={"relative"} border={"1px solid"} color={"white"}>
            <Text fontSize={"25px"} fontWeight={500} color={"#fff"}>
              Daily Blogs
            </Text>

        </Box>
    </Box>
    </Box>
  )
}

export default Sidebar