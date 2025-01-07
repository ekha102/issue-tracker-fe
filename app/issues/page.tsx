"use client";
import React from 'react'
import CreatedIssue from './new/page'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const IssuePage = () => {
  return (
    <div>
      <h1>Issue Page</h1>
      <Button><Link href="/issues/new">Create Issue</Link></Button>
    </div>
  )
}

export default IssuePage