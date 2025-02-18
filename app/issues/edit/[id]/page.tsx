import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'


interface Props {
  params: {id: string}
}

const EditIssuePage = async ({params}: Props) => {
  if (isNaN(Number(params.id))) notFound();
  
  const issue = await prisma?.issue.findUnique({
    where: { issue_id: parseInt(params!.id)}
    });

  if (!issue) notFound();

  return (
    <IssueForm issue={issue}/>
  )

}

export default EditIssuePage;
