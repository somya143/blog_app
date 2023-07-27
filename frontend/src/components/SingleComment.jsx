import React, { useContext } from 'react';
import { SlideFade, Box, Flex, Text, Tooltip, Spacer } from "@chakra-ui/react";
import moment from 'moment';
import CommentMenu from './CommentMenu';
import { useDispatch, useSelector } from 'react-redux';
import { removeComment } from '../redux/blog/blog.action';
import { SocketContext } from '../context/SocketContext';

const SingleComment = ({comment,userId,blogAuthor,blogId}) => {
    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);
    const { token } = useSelector((store) => store?.auth);
    const handleClick = () => {
        dispatch(removeComment({blogId,commentId:comment._id,socket,token}))
    }
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
          <Flex>
            <Box>
                <Text>
                    {Comment.commentAuthor.name}
                </Text>
                <Tooltip label={`${moment(new Date(comment.createdAt.toLocaleString())).format(" D MMM  YYYY, h:mm:ss a")}`} aria-label='A tooltip'>
                    <Text>{moment(new Date(comment.createdAt.toLocaleString())).fromNow()}</Text>
                </Tooltip>
            </Box>
            <Spacer />
            {
                (userId && comment.commentAuthor._id === userId) || (blogAuthor === userId) ? 
                (<CommentMenu handleClick={handleClick} />) : null
            }
          </Flex>
        <Text fontSize="15px" fontWeight="200" color="whiteAlpha.800">
            {comment.commentString}
        </Text>
        </Box>
      </SlideFade>
    </>
  )
}

export default SingleComment