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
  Text
} from '@chakra-ui/react'

const CommentDelete = ({ handleDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    handleDelete()
  }
  return (
    <>
    <Button onClick={onOpen} width={"100%"}>Delete Blog</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure, you want to delete this comment?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClick}>
              Delete
            </Button>
            <Button variant='ghost' onClick={onClose}>cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CommentDelete