import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { validateForm } from "../../validateForm";
import delay from 'delay';


export async function POST(request: NextRequest) {
  const body = await request.json();
  await delay(5000);
  const validation = validateForm.safeParse(body);
  // console.log("Validation: ", validation);
  if (validation.error) {
    // console.log("Detail Validation: ", validation.error.errors);
    return NextResponse.json(validation.error.format(), {status:400})
  }
  
  const {issue_title, issue_desc} = body;
  const createdIssue = await prisma.issue.create({
    data: {
      issue_title,
      issue_desc,
    }
  });
  // console.log("Created issue: ", createdIssue);
  return NextResponse.json(createdIssue, {status: 201});
}
