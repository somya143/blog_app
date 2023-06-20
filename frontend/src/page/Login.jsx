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

  import { useDispatch,useSelector } from "react-redux";
import { getLogin } from '../redux/auth/auth.action';

const Login = () => {
    const [login , setLogin] = useState({});
    const {isAuth,isError,isLoading} = useSelector((store) => store.auth)
    const dispatch = useDispatch();
      const handleChange = (e) => {
          const {name, value} = e.target;
          setLogin({...login , 
          [name]: value
      })
      }
    
      const handleSubmit = (e) => {
       e.preventDefault();
       dispatch(getLogin(login))
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
            Login Here
        </Heading>
    <form action="" onSubmit={handleSubmit}>
 <FormControl>
    
   <FormLabel m={"10px"} color={"teal.500"}>Email address :</FormLabel>
   <Input type='email' onChange={handleChange} name='email' />

  <FormLabel m={"10px"} color={"teal.500"}>Password :</FormLabel>
   <Input type='Password' onChange={handleChange} name='password' />
 
</FormControl>

<Button type='submit' mt={"30px"} w={"100%"} h={"3rem"} fontSize={"27px"} variant={"ghost"} backgroundColor={"teal.500"} color={"#fff"}>Login</Button>
</form>    
</Box>
    </>
  )
}

export default Login