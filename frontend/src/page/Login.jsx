import React, { useEffect, useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Heading,
    Button,
    useToast
  } from '@chakra-ui/react';

import { useDispatch,useSelector } from "react-redux";
import { getLogin } from '../redux/auth/auth.action';
import Loading from '../components/Loading';
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [login , setLogin] = useState({});
    const {isAuth,isError,isLoading} = useSelector((store) => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast()
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
      useEffect(() => {
        if(isAuth){
          toast({
            title: "Login successful",
            status: "success",
            position: "top",
            duration: 2000,
            isClosable: true,
          }) && navigate("/blogs")
        }
      }, [isAuth,navigate,toast])
    
      if(isLoading){
        return <Loading />
      }else if(isError){
        return <Error />
      }else
  return (
    <Box w={"100vw"} h={"100vh"} backgroundImage={"https://images.unsplash.com/photo-1497005367839-6e852de72767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2lnbiUyMHVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} backgroundRepeat={"no-repeat"} backgroundSize={"100%"}>
     
     <Box margin="auto" w="50%" borderRadius={"10px"}  >
        <Heading color={"orange"} fontSize={"3.2rem"} fontWeight={700} fontFamily={"sans-serif"} pb={"30px"} textDecoration={"underline"}>
            Login 
        </Heading>
    <form action="" onSubmit={handleSubmit}>
 <FormControl>
    
   <FormLabel m={"10px"} color={"green.300"}>Email address :</FormLabel>
   <Input type='email' color={"green.300"} onChange={handleChange} name='email' />

  <FormLabel m={"10px"} color={"green.300"}>Password :</FormLabel>
   <Input type='Password' color={"green.300"} onChange={handleChange} name='password' />
 
</FormControl>

<Button type='submit' mt={"30px"} w={"100%"} h={"3rem"} fontSize={"27px"} variant={"ghost"} backgroundColor={"green.300"} color={"#fff"}>Login</Button>
</form>    
</Box>
    </Box>
  )
}

export default Login