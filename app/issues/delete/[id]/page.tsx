import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React from 'react'


interface Props {
  params: { id: string }
}

const DeletePage = ({ params }: Props) => {
  // console.log("Testing delete id: ", params.id);

  return (
    <div>
      <h1>Delete the issue</h1>
    </div>
  )
}

export default DeletePage;
