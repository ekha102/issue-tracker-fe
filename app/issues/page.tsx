// "use client";
import React from 'react'
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import ViewIssues from './viewIssues';
import { prisma } from '@/prisma/client';
import IssueStatusFilter from './_components/IssueStatusFilter';

const IssuePage = async () => {

  const issuesList = await prisma.issue.findMany();
  // console.log("Data: ", issuesList);

  return (
    <div>
      <h1>Issue Page</h1>
      <Flex mb="5" justify="between">
        <IssueStatusFilter/>
        <Button><Link href="/issues/new">Create Issue</Link></Button>
      </Flex>
      <ViewIssues issuesList={issuesList} />      
    </div>
  )
}

export default IssuePage