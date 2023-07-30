import React, { useContext, useRef } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    Flex,
    Text,
    Spacer,
    Box
  } from '@chakra-ui/react';
import { AiFillLike , AiOutlineLike } from "react-icons/ai";
import SingleLike from './SingleLike';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlogLike } from '../redux/blog/blog.action';
import useLoginAlert from '../custom/useLoginAlert';
import { SocketContext } from '../context/SocketContext';

const LikeBlog = ({likes,userId,blogId,likesCount}) => {
    const ref = useRef();
    const {isOpen,onOpen,onClose} = useDisclosure();
    const { loginAlert } = useLoginAlert();
    const dispatch = useDispatch();
    const { token } = useSelector((store) => store?.auth);
    const { socket } = useContext(SocketContext);
    const handleLike = () => {
      (!userId)
      ? loginAlert()
      : likes?.find((el) => el._id===userId)
      ? (dispatch(removeBlogLike({blogId,socket,token,likesCount:likesCount - 1})) )
      :
      (dispatch(likeBlog({blogId,socket,token,likesCount:likesCount + 1})))
    }
  return (
    <Box ref={ref}>
     <Button onClick={onOpen} my={4} mb="0"
        size="sm"
        type="submit"
        variant="unstyled"
        fontSize="20px"
        w="100%"
        fontWeight="hairline"
        color="#3b7af7"
        >
        {likesCount ?? 0} {likesCount===1 ? "Like" : "Likes"}
     </Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>
        <Flex>
            <Text>Likes</Text>
            <Spacer />
            <IconButton
             cursor={"pointer"}
             onClick={handleLike}
             variant="unstyled"
             size="sm"
             color="blue"
             fontSize={"20px"}
             pl={"-10px"}
             as={(likes?.find((el) => el._id===userId))? (AiFillLike) : (AiOutlineLike) } 
             />

        </Flex>
    </ModalHeader>
    <ModalBody>
    {
        likes?.map((el) => (<SingleLike  key={el._id} like={el} />))
    }
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Box>
  )
}

export default LikeBlog