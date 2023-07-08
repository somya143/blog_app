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
import jwtDecode from "jwt-decode";

const Login = () => {
    const [login , setLogin] = useState({});
    const { isAuth,isError,isLoading,token } = useSelector((store) => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const email = token ? jwtDecode(token).email : null;
    const password = token ? jwtDecode(token).password : null;
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
          navigate("/blogs")
          
           }else{
            navigate("/login")
           }
          
        }, [isAuth,navigate,toast])
    
      if(isLoading){
        return <Loading />
      }else if(isError){
        return <Error />
      }else
  return (
    <Box  backgroundImage={"https://images.unsplash.com/photo-1497005367839-6e852de72767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2lnbiUyMHVwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} bgPosition="center"
    bgSize={"cover"}
    bgRepeat="no-repeat"
    width="100%"
    height={{ base: "100vh", sm: "100vh", md: "100vh", lg: "100vh" }}>
     
     <Box margin="auto" w="50%" borderRadius={"10px"}  >
        <Heading color={"orange"} pt={"30px"} fontSize={"3.2rem"} fontWeight={700} fontFamily={"sans-serif"} pb={"30px"} textDecoration={"underline"}>
            Login 
        </Heading>
    <form action="" onSubmit={handleSubmit}>
 <FormControl>
    
   <FormLabel m={"10px"} color={"orange"}>Email address :</FormLabel>
   <Input type='email' color={"orange"} border={"2px solid orange"} onChange={handleChange} name='email' />

  <FormLabel m={"10px"} color={"orange"}>Password :</FormLabel>
   <Input type='Password' color={"orange"} border={"2px solid orange"} onChange={handleChange} name='password' />
 
</FormControl>

<Button type='submit' mt={"30px"} w={"100%"} h={"3rem"} fontSize={"27px"} variant={"ghost"} backgroundColor={"orange"} color={"#fff"}>Login</Button>
</form>    
</Box>
    </Box>
  )
}

export default Login