import React from "react";
import {Stack , Button , Box, HStack} from "@chakra-ui/react";

const Pagination = ({current,handlePageClick,data,limit}) => {
    const prev = (
        <Button backgroundColor="orange" color="white" variant={"unstyled"} isDisabled={current===1?true:false}  onClick={() => handlePageClick(current-1)} >
          Prev
        </Button>
    );

    const currentPage = (
        <Button>{current}</Button>
    );

    const next = (
      <Button  backgroundColor="orange" variant={"unstyled"}  color="white" onClick={() => handlePageClick(current+1)} >
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
    </HStack>
     </Stack>
)
}

export default Pagination