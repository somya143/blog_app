import React from "react";
import {Stack , Button , Text, Box, HStack} from "@chakra-ui/react";

const Pagination = ({current,handlePageClick,total}) => {
    const prev = (
        <Button backgroundColor="orange" color="white" isDisabled={current===1?true:false}  onClick={() => handlePageClick(current-1)} >
          Prev
        </Button>
    );

    const currentPage = (
        <Button>{current}</Button>
    );

    const next = (
      <Button  backgroundColor="orange" color="white" onClick={() => handlePageClick(current+1)} >
         Next
      </Button>
    )



return (
   <Stack direction="row" align="center"   pl={20} mt={0} bg={"gray"}  >
    <HStack justifyContent="center" w="full" >
    <Box>
    {prev}
   {currentPage}
   {next}
    </Box>

    <Box>
      <Text>
        Total Blogs So Far : {total}
      </Text>
    </Box>
    </HStack>
    
    </Stack>
)
}

export default Pagination