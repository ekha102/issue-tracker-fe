import { prisma } from '@/prisma/client'
import { Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import IssueStatusBudge from '../issueStatusBudge';

interface Props {
  params: {id: string}
}


const issueDetailsPage = async ({params}: Props) => {
  if (isNaN(Number(params.id))) notFound();
  
 

  const issueDetails = await prisma.issue.findUnique({
    where: {issue_id: parseInt(params.id)},
  });
  
  if (!issueDetails) notFound();
  
  
  const {issue_title, issue_desc, issue_status, issue_created} = issueDetails;


  return (
    <div>
      <h1>Issue Details:</h1>
      <Heading as="h1">{issue_title}</Heading>
      <Flex className='gap-2'>
        <IssueStatusBudge status={issue_status} />
        <Text>{issue_created.toDateString()}</Text>
      </Flex>
    </div>
  )
}

export default issueDetailsPage