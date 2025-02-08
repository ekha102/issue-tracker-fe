"use client"
import { Select } from '@radix-ui/themes'
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())
const SelectAssignee = () => {

  const {data:users=[], error, isLoading} = useSWR("/api/users", fetcher);

  console.log("Users: ", users)


  return (
    <Select.Root defaultValue="User">
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>User</Select.Label>
          {users?.map((user) => {
            return (
              <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default SelectAssignee;
