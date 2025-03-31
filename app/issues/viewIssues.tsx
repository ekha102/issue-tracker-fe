"use client";
import { Issue } from '@prisma/client'
import { Badge, Table } from '@radix-ui/themes'
import React, { useState } from 'react'
import IssueStatusBudge from './issueStatusBudge'
import Link from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  issuesList: Issue,
  searchParams: Issue,
  columns: Object,
}

const ViewIssues = ({ issuesList, searchParams, columns }: Props) => {
  // console.log("Data:", issuesList);

  
  // console.log("Column: ", columns)

  


  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {/* <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Created Date</Table.ColumnHeaderCell> */}
          {columns.map((col) => {
            return (
              <Table.ColumnHeaderCell key={col.value} className={col.className}><Link href={{query: {...searchParams, orderBy: col.value}}}>{col.label}</Link>{col.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}</Table.ColumnHeaderCell>
            );
          })}
          

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
              <Table.Cell className="hidden md:table-cell">{ele.issue_desc}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">{ele.issue_created.toDateString()}</Table.Cell>
            </Table.Row>
          );
        })}

      </Table.Body>
    </Table.Root>
  )
}

export default ViewIssues