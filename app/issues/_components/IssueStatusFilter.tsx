"use client"
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'


const Statuses: {label: string, value?: Status} [] = [
  {label: 'All'},
  {label: 'Open', value:'OPEN'},
  {label: 'In Progress', value:'IN_PROGRESS'},
  {label: 'Close', value:'CLOSED'},
]



const IssueStatusFilter = () => {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  // console.log("Current Search Params: ", currentSearchParams)

  const handleStatus = (issue_status: string) => {
    // console.log(status);
    // currentSearchParams.get("orderBy ")
    const params = new URLSearchParams();
    if (issue_status) 
      params.append("status", issue_status)
    if (currentSearchParams.get("orderBy"))
      params.append("orderBy", currentSearchParams.get("orderBy")!)
    
 
    const query = params.size ? "?" + params.toString() : "";
    // issue_status ? `?status=${issue_status}` : ''
    // console.log("Status:", issue_status);
    router.push('/issues' + query);
  }


  return (
    <Select.Root defaultValue={currentSearchParams.get("status") || "" } onValueChange={handleStatus}>
      <Select.Trigger placeholder='Filter by status...'/>
      <Select.Content>
        {Statuses.map((ele, index) => {
          return (
            <Select.Item key={index} value={ele.value ?? "All"}>{ele.label}</Select.Item>);
        })}
        
      </Select.Content>
      
    </Select.Root>
  )
}

export default IssueStatusFilter
