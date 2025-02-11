import { z } from "zod";

export const validateForm = z.object({
  issue_title: z.string().min(2, "Required more than 1 character").max(255),
  issue_desc: z.string().min(1).max(255),
});


export const editValidate = z.object({
  issue_title: z.string().min(2, "Required more than 1 character").max(255),
  issue_status: z.string().min(2),
  issue_desc: z.string().min(1).max(255),
});

export const postValidateForm = z.object({
  issue_title: z.string().min(2, "Required more than 1 character").max(255).optional(),
  issue_desc: z.string().min(1).max(255).optional(),
  assignToUserId: z.string().min(1, "AssignToUserId is required.").max(255).optional().nullable(),
});