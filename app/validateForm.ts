import { z } from "zod";

export const validateForm = z.object({
  issue_title: z.string().min(2, "Required more than 1 character").max(255),
  issue_desc: z.string().min(1).max(255),
});
