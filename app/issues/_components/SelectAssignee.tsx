"use client"
import { Select } from '@radix-ui/themes'
import React from 'react'

const SelectAssignee = () => {
  return (
    <Select.Root defaultValue="User">
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>User</Select.Label>
          <Select.Item value="1">Eric Kha</Select.Item>
          <Select.Item value="2">Tim Kha</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default SelectAssignee;
