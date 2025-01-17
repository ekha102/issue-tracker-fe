import { validateForm } from "@/app/validateForm";
import { prisma } from "@/prisma/client";
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

  const updateIssue = await prisma.issue.update({
    where: {issue_id: issueId.issue_id},
    data: {
      issue_title: body.issue_title,
      issue_desc: body.issue_desc
    }
  });
  return NextResponse.json(updateIssue);

}
