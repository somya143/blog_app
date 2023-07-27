import React, { useContext, useEffect, useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    VStack,
    Box,
    Text,
    Heading,
    Select,
    Button,
    useToast,
    Flex,
    Center
  } from '@chakra-ui/react';
  import "./register.css"

 import { useSelector, useDispatch } from "react-redux" 
import { getRegister } from '../redux/auth/auth.action';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { SocketContext } from '../context/SocketContext';

const Register = () => {
const [register , setRegister] = useState({});
const {isSignUp,isError,isLoading} = useSelector((store) => store.auth)
const dispatch = useDispatch();
const toast = useToast();
const navigate = useNavigate();
const { socket } = useContext(SocketContext);

const handleChange = (e) => {
      const {name, value} = e.target;
      setRegister({...register , 
      [name]: value
  })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRegister(register,socket))
    
  }
  useEffect(() => {
    if(isSignUp){
      toast({
        title: "Account created successfully",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      }) && navigate("/login")
    }
  }, [isSignUp,navigate,toast])
  
  if(isLoading){
    return <Loading />
  }else if(isError){
    return <Error />
  }


  return (
    <Box  backgroundImage={"https://images.unsplash.com/photo-1688462035292-61c6407a639c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"} bgSize="cover"
    bgPosition="center"
    bgRepeat="no-repeat"
    width="100%"
    height={{ base: "100vh", sm: "100vh", md: "100vh", lg: "100vh" }}  >
    <Flex>
      <Sidebar />
    
    <Box margin={"auto"} w={{ base: "100%", md: "50%", lg: "55%" }} className='registerBox'  >
        <Heading color={"orange"} fontSize={"3.2rem"} fontWeight={700} fontFamily={"sans-serif"} pb={"30px"} textDecoration={"underline"}>
            Sign Up
        </Heading>
    <form action="" onSubmit={handleSubmit}>
 <FormControl>
    
 <FormLabel  mt={"30px"} m={"10px"} color={"green.300"}>Name :</FormLabel>
   <Input type='text'color={"#fff"} onChange={handleChange} name='name' />

   <FormLabel m={"10px"} color={"green.300"}>Email address :</FormLabel>
   <Input type='email' color={"white"} onChange={handleChange} name='email' />

  <FormLabel m={"10px"} color={"green.300"}>Password :</FormLabel>
   <Input type='Password' color={"white"} onChange={handleChange} name='password' />

   <FormLabel m={"10px"} color={"green.300"}>Age :</FormLabel>
   <Input type='Number' color={"white"} onChange={handleChange} name='age' />

   <Select placeholder='Select Gender :' mt={"30px"} color={"green.300"}  fontWeight={"bold"} onChange={handleChange} name='gender'>
  <option value='Male'>Male</option>
  <option value='Female'>Female</option>
  <option value='Other'>Other</option>
</Select>
</FormControl>

<Button type='submit' mt={"30px"} w={"100%"} h={"3rem"} fontSize={"27px"} variant={"ghost"} backgroundColor={"green.300"} color={"#fff"}>Register</Button>
</form>    
</Box>
</Flex>
    </Box>
  )
}

export default Register