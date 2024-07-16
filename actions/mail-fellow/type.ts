import { z } from "zod";

export const formSchema = z.object({
  contacts: z
    .string()
    .min(3, { message: "contacts must be at least 3 characters." }),
  notion_page: z.string().min(10).max(50),
  auto_option: z.boolean().default(false).optional(),
  month: z.string(),
  week: z.string(),
});