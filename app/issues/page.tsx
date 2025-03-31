// "use client";
import React from 'react'
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import ViewIssues from './viewIssues';
import { prisma } from '@/prisma/client';
import IssueStatusFilter from './_components/IssueStatusFilter';
import { Issue, Status } from '@prisma/client';
import { useSearchParams } from 'next/navigation';


type SearchParams = Promise<{ status: Status, orderBy: keyof Issue }>;

interface Props {
  searchParams: SearchParams;
}


const IssuePage = async(props: Props) => {
  const searchParams = await props.searchParams;
  // const currentSearchParams = useSearchParams();

  // console.log("CurrentlySearchParams:", currentSearchParams)

  const statuses = Object.values(Status);

  const columns:{label: string, value: keyof Issue, className?: string} [] = [
    {label: "ID", value: "issue_id"},
    {label: "Issue", value: "issue_title"},
    {label: "Status", value: "issue_status", className:"hidden md:table-cell"},
    {label: "Description", value: "issue_desc", className: "hidden md:table-cell"},
    {label: "Created", value: "issue_created", className: "hidden md:table-cell"},
  ]
  // console.log("statuses: ", statuses)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  // const orderBy = searchParams.orderBy ? {[searchParams.orderBy] : "asc"} : undefined
  const orderBy = columns.map(col => col.value).includes(searchParams.orderBy) ? {[searchParams.orderBy] : 'asc'} : undefined
  
  

 

  

  const issuesList = await prisma.issue.findMany({
    where: {
      issue_status: status,
    },
    orderBy
  });
  // console.log("Data: ", issuesList);


  return (
    <div>
      <h1>Issue Page</h1>
      <Flex mb="5" justify="between">
        <IssueStatusFilter/>
        <Button><Link href="/issues/new">Create Issue</Link></Button>
      </Flex>
      <ViewIssues issuesList={issuesList} searchParams={searchParams} columns={columns}/>      
    </div>
  )
}

export default IssuePage