import React from 'react';
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
    Spacer
  } from '@chakra-ui/react';
  import { AiFillLike , AiFillDislike , AiOutlineLike} from "react-icons/ai";
import SingleLike from './SingleLike';
import { useDispatch } from 'react-redux';
import { likeBlog } from '../redux/blog/blog.action';
import useLoginAlert from '../custom/useLoginAlert';

const LikeBlog = ({likes,userId,blogId,token,likesCount}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();
    const { loginAlert } = useLoginAlert();
    const dispatch = useDispatch()
    const handleLike = () => {
      !userId? 
      loginAlert(): likes.find((el) => el._id===userId)?
      (dispatch(({socket,token,likesCount:likesCount-1})))
    }
  return (
    <>
     <Button onClick={onOpen}>Like</Button>

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

             as={likes.find((el) => el._id===userId? AiFillLike:AiOutlineLike)} />

        </Flex>
    </ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    {
        likes.map((el) => <SingleLike key={el._id} like={el} userId={userId} blogId={blogId} />)
    }
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  )
}

export default LikeBlog