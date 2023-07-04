import React, { useState } from 'react';
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
    Button
  } from '@chakra-ui/react';

 import { useSelector, useDispatch } from "react-redux" 
import { getRegister } from '../redux/auth/auth.action';

const Register = () => {
const [register , setRegister] = useState({});
const {isAuth,isError,isLoading} = useSelector((store) => store.auth)
const dispatch = useDispatch();
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

  if(isLoading){
    return <h1>Loading...</h1>
  }else if(isError){
    return <h1>Something went wrong...</h1>
  }else

  return (
    <Box W={"100vw"} h={"180vh"} backgroundImage={"https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lnbiUyMHVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} backgroundRepeat={"no-repeat"} backgroundSize={"100%"} >
    <Box w="50%" mt={"0"} borderRadius={"10px"} position={"fixed"} left={"350"} top={"20"} zIndex={"1000"} >
        <Heading color={"orange"} fontSize={"3.2rem"} fontWeight={700} fontFamily={"sans-serif"} pb={"30px"} textDecoration={"underline"}>
            Register Yourself Here
        </Heading>
    <form action="" onSubmit={handleSubmit}>
 <FormControl>
    
 <FormLabel  mt={"30px"} m={"10px"} color={"green.300"}>Name :</FormLabel>
   <Input type='text' onChange={handleChange} name='name' />

   <FormLabel m={"10px"} color={"green.300"}>Email address :</FormLabel>
   <Input type='email' onChange={handleChange} name='email' />

  <FormLabel m={"10px"} color={"green.300"}>Password :</FormLabel>
   <Input type='Password' onChange={handleChange} name='password' />

   <FormLabel m={"10px"} color={"green.300"}>Age :</FormLabel>
   <Input type='Number' onChange={handleChange} name='age' />

   <Select placeholder='Select Gender :' mt={"30px"} color={"green.300"} fontWeight={"bold"} onChange={handleChange} name='gender'>
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