import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    IconButton
  } from '@chakra-ui/react';
  import { BiDotsVerticalRounded } from "react-icons/bi";
import CommentDelete from './CommentDelete';


const CommentMenu = ({handleDelete}) => {
  return (
    <>
    <Menu>
  <MenuButton as={IconButton} icon={<BiDotsVerticalRounded size={"30px"} />}>
    Delete
  </MenuButton>
  <MenuList>
    <CommentDelete handleDelete={handleDelete} />
  </MenuList>
</Menu>
    </>
  )
}

export default CommentMenu