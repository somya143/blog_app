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
    <>
    <Box margin="auto" w="50%" mt={"40px"} borderRadius={"10px"} boxShadow={"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;"} >
        <Heading color={"teal.500"}>
            Register Yourself Here
        </Heading>
    <form action="" onSubmit={handleSubmit}>
 <FormControl>
    
 <FormLabel  mt={"30px"} m={"10px"} color={"teal.500"}>Name :</FormLabel>
   <Input type='text' onChange={handleChange} name='name' />

   <FormLabel m={"10px"} color={"teal.500"}>Email address :</FormLabel>
   <Input type='email' onChange={handleChange} name='email' />

  <FormLabel m={"10px"} color={"teal.500"}>Password :</FormLabel>
   <Input type='Password' onChange={handleChange} name='password' />

   <FormLabel m={"10px"} color={"teal.500"}>Age :</FormLabel>
   <Input type='Number' onChange={handleChange} name='age' />

   <Select placeholder='Select Gender :' mt={"30px"} color={"teal.500"} fontWeight={"bold"} onChange={handleChange} name='gender'>
  <option value='Male'>Male</option>
  <option value='Female'>Female</option>
  <option value='Other'>Other</option>
</Select>
</FormControl>

<Button type='submit' mt={"30px"} w={"100%"} h={"3rem"} fontSize={"27px"} variant={"ghost"} backgroundColor={"teal.500"} color={"#fff"}>Register</Button>
</form>    
</Box>
    </>
  )
}

export default Register