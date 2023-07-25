import React from "react";
import { SlideFade, Box, Text } from "@chakra-ui/react";

function SingleLike({like}) {
    //const { _id } = like
    console.log(like.name)
  //console.log(_id)
    return (
      <>
        <SlideFade in offsetY='20px'>
          <Box
            p='40px'
            color='white'
            mt='4'
            bg='teal.500'
            rounded='md'
            shadow='md'
          >
            <Text fontSize={"19px"} fontFamily={"sans-serif"} color={"white"}>
             {like._id}
            </Text>
          </Box>
        </SlideFade>
      </>
    )
  }

  export default SingleLike;