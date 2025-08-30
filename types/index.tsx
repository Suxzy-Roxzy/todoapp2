import { title } from "process";
import { z } from "zod";

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createDate: string;
};

export const TodoSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, "Must be greater than three!")
    .max(50, "Too much characters!"),
  description: z
    .string()
    .min(3, "Must be more than 3 characters!")
    .max(200, "Too much characters!"),
  completed: z.boolean(),
  createDate: z.iso.datetime()
});

export type Todoschematype = z.infer<typeof TodoSchema>;
