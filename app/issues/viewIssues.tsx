import { Issue } from '@prisma/client'
import { Badge, Table } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBudge from './issueStatusBudge'
import Link from 'next/link';

interface Props {
  issuesList: Issue,
}

const ViewIssues = ({ issuesList }: Props) => {
  // console.log("Data:", issuesList);



  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Created Date</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issuesList.map((ele) => {
          return (
            <Table.Row key={ele.issue_id}>
              <Table.RowHeaderCell>{ele.issue_id}</Table.RowHeaderCell>
              <Table.Cell>
                <Link href={`/issues/${ele.issue_id}`}>
                  {ele.issue_title} <div className="block md:hidden"><IssueStatusBudge status={ele.issue_status} /></div>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><IssueStatusBudge status={ele.issue_status} /></Table.Cell>
              <Table.Cell className="hidden md:table-cell">{ele.issue_created.toDateString()}</Table.Cell>
            </Table.Row>
          );
        })}

      </Table.Body>
    </Table.Root>
  )
}

export default ViewIssues