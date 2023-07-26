import React from "react";
import { SlideFade, Box, Text } from "@chakra-ui/react";

function SingleLike({like}) {
    return (
      <>
        <SlideFade in offsetY='20px'>
          <Box
            p={"8px"}
            color='white'
            mt='2'
            bg='orange.500'
            rounded='md'
            shadow='md'
          >
            <Text fontSize={"19px"} fontFamily={"sans-serif"} color={"white"}>
             {like.name}
            </Text>
          </Box>
        </SlideFade>
      </>
    )
  }

  export default SingleLike;