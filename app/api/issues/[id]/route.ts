import { validateForm } from "@/app/validateForm";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {id: string}
}

export async function PUT(request: NextRequest, {params}: Props) {
  const body = await request.json();
  // console.log("id:", params.id);
  // console.log("Body:", body);
  const validation = validateForm.safeParse(body);
  // console.log("Validation", validation);
  if (validation.error) 
    return NextResponse.json(validation.error.format(), {status:400});

  const issueId = await prisma.issue.findUnique({
    where: {issue_id: parseInt(params?.id)}
  });
  // console.log("Issue ID:", issueId);
  if (!issueId)
    return NextResponse.json({error: "Invalid Issue"}, {status:404});

  const {issue_title, issue_desc} = body;
  const updateIssue = await prisma.issue.update({
    where: {issue_id: issueId.issue_id},
    data: {
      issue_title,
      issue_desc,
    }
  });
  return NextResponse.json(updateIssue);

}


export async function DELETE(request: NextRequest, {params}:Props) {
  const issueId = await prisma.issue.findUnique({
    where: {issue_id: parseInt(params?.id)}
  })
  // console.log("ID: ", params.id)
  // console.log(issueIdCheck);
  if (!issueId) 
    return NextResponse.json({error: "Invalid Issue"}, {status:404});

  await prisma.issue.delete({
    where: {issue_id: issueId?.issue_id},
  });

  return NextResponse.json({});
}
