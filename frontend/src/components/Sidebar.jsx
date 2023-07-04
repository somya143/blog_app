import React from 'react';
import { Box,Text,List,ListItem,ListIcon,Link, Flex, Button } from "@chakra-ui/react";
import { Link as ReachLink , useNavigate } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi"
import { useSelector,useDispatch } from "react-redux";
import jwtDecode from "jwt-decode"
import { getSignout } from '../redux/auth/auth.action';

const Sidebar = () => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = token? jwtDecode(token).name : null;
  const email = token? jwtDecode(token).email : null;
  const handleClick = () => {
      token? dispatch(getSignout()) : navigate("/login")
  }
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
      <Box border={"3px solid green"}  w={"100%"} h={"200px"} color={"orange"} fontSize={"20px"} fontFamily={"sans-serif"}>
      <Text mt={"1rem"} fontWeight={"bold"} fontSize={"25px"} textDecoration={"underline"}>User Details</Text>
      {
          name && (
            <Flex mt={"1rem"}>
              <RxAvatar size={30} m={4} ></RxAvatar>
              <Text ml={4}>{name}</Text>
            </Flex>
          )
        }
        {
          email && (
            <Flex mt={"1rem"} mb={"2rem"}>
            <TfiEmail size={30} m={4} ></TfiEmail>
            <Text ml={4} fontSize={"20px"}>{email}</Text>
          </Flex>
          )
        }
      </Box>

    <Box border={"2px solid"} p={4} color={"green.400"} mt={"3rem"}>
        <Box p={6} position={"relative"} border={"1px solid"} color={"green.400"}>
            <Text fontSize={"25px"} fontWeight={500} color={"orange"} textDecoration={"underline"}>
              Daily Blogs
            </Text>
            <List fontWeight="400" fontSize="25px">
              <ListItem my={10} alignItems={"center"}>
                  <Link as={ReachLink} to="/" color={"orange"} >
                    <ListIcon as={FcHome}  mr={4} />
                    Home
                  </Link>
              </ListItem>

              <ListItem my={9} alignItems={"center"}>
                  <Link as={ReachLink} to="/trending" color={"orange"} >
                    <ListIcon as={FcBullish}  mr={3} />
                     Trending
                  </Link>
              </ListItem>

              <ListItem my={9} alignItems={"center"}>
                  <Link as={ReachLink} to="/write" color={"orange"} >
                    <ListIcon as={FcEditImage}  mr={4} />
                     Write
                  </Link>
              </ListItem>
            </List>
            </Box>
      </Box>

      <Box  w={"100%"} color={"#fff"} fontSize={"25px"} mt={"2rem"}>
       
        <Button backgroundColor={"green"} color={"#fff"} fontSize={"25px"} width={"100%"} onClick={handleClick}  >
          {token? "Logout" : "Login"}
        </Button>
      </Box>

    </Box>
  )
}

export default Sidebar