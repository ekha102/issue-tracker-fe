import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { validateForm } from "../../validateForm";
import delay from 'delay';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";


export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, {status:401});
  
  const body = await request.json();
  const {issue_title, issue_desc} = body;
  
  const validation = validateForm.safeParse(body);
  // console.log("Validation: ", validation);
  if (validation.error) {
    // console.log("Detail Validation: ", validation.error.errors);
    return NextResponse.json(validation.error.format(), {status:400})
  }

  
  
  
  const createdIssue = await prisma.issue.create({
    data: {
      issue_title,
      issue_desc,
    }
  });
  // console.log("Created issue: ", createdIssue);
  return NextResponse.json(createdIssue, {status: 201});
}
