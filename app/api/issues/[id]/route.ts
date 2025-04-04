import authOptions from "@/app/auth/AuthOptions";
import { postValidateForm } from "@/app/validateForm";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {id: string}
}

export async function PUT(request: NextRequest, {params}: Props) {

  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, {status:401});

  const body = await request.json();
  // console.log("id:", params.id);
  // console.log("Body:", body);
  const validation = postValidateForm.safeParse(body);
  const {issue_title, issue_desc, assignedToUserId} = body;
  // console.log("AssignToUserId: ", AssignToUserId);


  // console.log("Validation", validation);
  if (validation.error) 
    return NextResponse.json(validation.error.format(), {status:400});

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({where: {id: assignedToUserId }});
    if (!user) {
      return NextResponse.json({error: "Invalid User."}, {status:400});
    }

  }

  const issueId = await prisma.issue.findUnique({
    where: {issue_id: parseInt(params?.id)}
  });
  // console.log("Issue ID:", issueId);
  if (!issueId)
    return NextResponse.json({error: "Invalid Issue"}, {status:404});

  
  const updateIssue = await prisma.issue.update({
    where: {issue_id: issueId.issue_id},
    data: {
      issue_title,
      issue_desc,
      assignedToUserId,
    }
  });
  return NextResponse.json(updateIssue);

}


export async function DELETE(request: NextRequest, {params}:Props) {
  // await delay(5000);
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, {status:401});
  
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
