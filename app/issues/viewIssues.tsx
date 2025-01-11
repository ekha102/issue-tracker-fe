import { Issue } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import React from 'react'

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
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created Date</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issuesList.map((ele:any) => {
          return (
            <Table.Row key={ele.issue_id}>
              <Table.RowHeaderCell>{ele.issue_id}</Table.RowHeaderCell>
              <Table.Cell>{ele.issue_title}</Table.Cell>
              <Table.Cell>{ele.issue_status}</Table.Cell>
              <Table.Cell>{ele.issue_created.toDateString()}</Table.Cell>
            </Table.Row>
          );
        })}

      </Table.Body>
    </Table.Root>
  )
}

export default ViewIssues