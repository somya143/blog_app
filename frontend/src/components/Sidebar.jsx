import React from 'react';
import { Box,Text,List,ListItem,ListIcon,Link, Flex, Button, useBreakpointValue } from "@chakra-ui/react";
import { Link as ReachLink , useNavigate } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi"
import { FcNews } from "react-icons/fc";
import { FcRegisteredTrademark } from "react-icons/fc";
import { FcRight } from "react-icons/fc"
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
  const displayBreakUp = useBreakpointValue({ base: 'none', md: 'block' })
  return (
    <Box 
    float={"left"} 
    minW={{'lg':"20vw" , 'md':"30vw"}} 
    h="109vh"
    position={"relative"}
    border={"1px solid black"}
    bg={"gray.700"}
    overflowY={"auto"}
    display={displayBreakUp}
    top="0"
    left="0"
    >
      {name && email && <Box border={"3px solid green"}  w={"100%"} h={"170px"} color={"orange"} fontSize={"20px"} fontFamily={"sans-serif"}>
      <Text mt={"1rem"} fontWeight={"bold"} fontSize={"25px"} textDecoration={"underline"}>User Details</Text>
      {
          name && (
            <Flex mt={"1rem"}>
              <RxAvatar size={30} m={2} ></RxAvatar>
              <Text ml={4}>{name}</Text>
            </Flex>
          )
        }
        {
          email && (
            <Flex mt={"1rem"}>
            <TfiEmail size={30} m={2} ></TfiEmail>
            <Text ml={4} fontSize={"20px"}>{email}</Text>
          </Flex>
          )
        }
      </Box>}

    <Box border={"2px solid"} p={4} color={"green.400"}>
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
                  <Link as={ReachLink} to="/write" color={"orange"} >
                    <ListIcon as={FcEditImage}  mr={4} />
                     Write
                  </Link>
              </ListItem>

              <ListItem my={9} alignItems={"center"}>
                  <Link as={ReachLink} to="/blogs" color={"orange"} >
                    <ListIcon as={FcNews}  mr={4} />
                     Blogs
                  </Link>
              </ListItem>

              <ListItem my={9} alignItems={"center"}>
                  <Link as={ReachLink} to="/register" color={"orange"} >
                    <ListIcon as={FcRegisteredTrademark}  mr={4} />
                     Register
                  </Link>
              </ListItem>

              <ListItem my={7} alignItems={"center"}>
                  <Link as={ReachLink} to="/login" color={"orange"} >
                    <ListIcon as={FcRight}  mr={4} />
                     Login
                  </Link>
              </ListItem>
            </List>
            </Box>
      </Box>

      <Box  w={"100%"} color={"#fff"} fontSize={"25px"} mb={"0.5rem"}>
       
        <Button backgroundColor={"green"} color={"#fff"} fontSize={"25px"} width={"100%"} onClick={handleClick}  >
          {token && token? "Logout" : "Login"}
        </Button>
      </Box>

    </Box>
  )
}

export default Sidebar