import { prisma } from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBudge from './issues/issueStatusBudge'

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {issue_created: "desc"},
    take: 5,
    include: {
      assignedToUser: true
    }
  })


  return (
    <Card >
      <Heading size="4" mb="5">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.issue_id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start">
                    <Link href={`/issues/${issue.issue_id}`}>{issue.issue_title}</Link>
                    <IssueStatusBudge status={issue.issue_status}/>
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar src={issue.assignedToUser.image!} fallback="?" size="2" radius='full'/>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )

}

export default LatestIssues;