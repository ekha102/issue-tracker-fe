'use client';
import { Issue } from '@prisma/client'
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'


interface Props {
  issueDetails: Issue
}

const DeleteIssuePage = ({ issueDetails }: Props) => {
  const router = useRouter();
  // console.log("Detail of delete: ", issueDetails);
  const { issue_id, issue_title } = issueDetails;

  const handleDelete = async (issueId: number) => {
    // console.log("ID for delete", issueId);

    await axios.delete(`/api/issues/${issueId}`);
    router.push("/issues");


  }


  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Do you want to delete this {issue_title}</AlertDialog.Title>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              No
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={() => handleDelete(issue_id)}>Yes
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssuePage
