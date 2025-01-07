import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



const validateForm = z.object({
  issue_title: z.string().min(1).max(255),
  issue_desc: z.string().min(1).max(255),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
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
