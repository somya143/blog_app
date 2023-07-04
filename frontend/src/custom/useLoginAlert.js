import { Box, useToast } from "@chakra-ui/react";

export default function useLoginAlert() {
  const toast = useToast();
  const loginAlert = () =>
    toast({
      position: "top-left",
      render: () => (
        <Box p={3} bg="blue.500" borderRadius="10px" color="whiteAlpha.800">
          Please login to interact !
        </Box>
      ),
    });

  return { loginAlert };
}