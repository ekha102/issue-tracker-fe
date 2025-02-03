import { prisma } from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React, { useState } from 'react'
import IssueStatusBudge from '../issueStatusBudge';
import Markdown from 'react-markdown';
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from 'next/link';

// import DeleteIssuePage from '../delete/[id]/pppage';


interface Props {
  params: { id: string }
}


const issueDetailsPage = async ({ params }: Props) => {
  

  if (isNaN(Number(params.id))) notFound();

  // const router = useRouter();
  // console.log("Detail of delete: ", issueDetails);
  



  const issueDetails = await prisma.issue.findUnique({
    where: { issue_id: parseInt(params.id) },
  });


  if (!issueDetails) notFound();

  const { issue_id, issue_title, issue_desc, issue_status, issue_created } = issueDetails;


 



  return (
    <div>
      <h1>Issue Details:</h1>
      <Grid columns={{ initial: "1", md: "2" }} gap="8">
        <Box>
          <Heading as="h1">{issue_title}</Heading>
          <Flex className='gap-2'>
            <IssueStatusBudge status={issue_status} />
            <Text>{issue_created.toDateString()}</Text>
          </Flex>
          <Card>
            <Markdown>{issue_desc}</Markdown>
          </Card>
        </Box>

        <Box>
          <Flex direction="column" gap="2">
            <Button><Pencil2Icon /> <Link href={`/issues/edit/${issue_id}`}>Edit Issue </Link></Button>
            <Button color='red'><Link href={`/issues/delete/${issue_id}`}>Delete</Link></Button>
          </Flex>
        </Box>
      </Grid>

    </div>
  )
}

export default issueDetailsPage