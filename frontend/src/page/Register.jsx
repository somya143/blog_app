import React, { useEffect, useState } from 'react';
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
    useToast
  } from '@chakra-ui/react';

 import { useSelector, useDispatch } from "react-redux" 
import { getRegister } from '../redux/auth/auth.action';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useNavigate, Navigate } from 'react-router-dom';

const Register = () => {
const [register , setRegister] = useState({});
const {isAuth,isError,isLoading} = useSelector((store) => store.auth)
const dispatch = useDispatch();
const toast = useToast();
const navigate = useNavigate();

const successToast =  ()=>{
  toast({
      title: 'Account Created',
      description: "You Have Successfully Created Account!",
      status: 'success',
      duration: 4000,
      isClosable: true,
  });

}
const failToast = () =>{
toast({
  title: "Failed.",
  description: "Sign up failed!!",
  status: "error",
  duration: 3000,
  isClosable: true,
});
}
const toaster={
  successToast,
  failToast
}
const handleChange = (e) => {
      const {name, value} = e.target;
      setRegister({...register , 
      [name]: value
  })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRegister(register))
    
  }
  useEffect(() => {
    if(isAuth){
      navigate("/login")
    }
  },[isAuth,navigate])
  
  if(isLoading){
    return <Loading />
  }else if(isError){
    return <Error />
  }


  return (
    <Box W={"100vw"} h={"180vh"} backgroundImage={"https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lnbiUyMHVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} backgroundRepeat={"no-repeat"} backgroundSize={"100%"} >
    <Box w="50%" mt={"0"} borderRadius={"10px"} position={"fixed"} left={"350"} top={"20"} zIndex={"1000"} >
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

   <Select placeholder='Select Gender :' mt={"30px"} color={"white"} fontWeight={"bold"} onChange={handleChange} name='gender'>
  <option value='Male'>Male</option>
  <option value='Female'>Female</option>
  <option value='Other'>Other</option>
</Select>
</FormControl>

<Button type='submit' mt={"30px"} w={"100%"} h={"3rem"} fontSize={"27px"} variant={"ghost"} backgroundColor={"green.300"} color={"#fff"}>Register</Button>
</form>    
</Box>
    </Box>
  )
}

export default Register