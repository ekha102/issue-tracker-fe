// "use client";
import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import ViewIssues from './viewIssues';
import { prisma } from '@/prisma/client';

const IssuePage = async () => {

  const issuesList = await prisma.issue.findMany();
  // console.log("Data: ", issuesList);

  return (
    <div>
      <h1>Issue Page</h1>
      <div className='mb-5'>
        <Button><Link href="/issues/new">Create Issue</Link></Button>
      </div>
      <ViewIssues issuesList={issuesList} />      
    </div>
  )
}

export default IssuePage