"use client"
import { Issue } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React from 'react'
import useSWR from 'swr'
import toast, {Toaster} from "react-hot-toast";

const fetcher = (url: string) => fetch(url).then(res => res.json())
const SelectAssignee = ({ issueDetails }: { issueDetails: Issue }) => {

  const { data: users = [], error, isLoading } = useSWR("/api/users", fetcher);

  const selectUser = async (userId: string) => {
    try {
      await axios.put("/api/issues/" + issueDetails.issue_id, { assignedToUserId: userId === "Unassigned" ? null : userId });
    } catch (error) {
      toast.error("Change could not be saved.");
    }
    
  }

  return (
    <>
      <Select.Root
        defaultValue={issueDetails.assignedToUserId || "Unassigned"}
        onValueChange={selectUser}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>User</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => {
              return (
                <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster/>
    </>
  )
}

export default SelectAssignee;
