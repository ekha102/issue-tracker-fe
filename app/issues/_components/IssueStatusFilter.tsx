"use client"
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'


const Statuses: {label: string, value?: Status} [] = [
  {label: 'All'},
  {label: 'Open', value:'OPEN'},
  {label: 'In Progress', value:'IN_PROGRESS'},
  {label: 'Close', value:'CLOSED'},
]


const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by status...'/>
      <Select.Content>
        {Statuses.map((ele) => {
          return (
            <Select.Item key={ele.value} value={ele.value ?? "All"}>{ele.label}</Select.Item>);
        })}
        
      </Select.Content>
      
    </Select.Root>
  )
}

export default IssueStatusFilter
