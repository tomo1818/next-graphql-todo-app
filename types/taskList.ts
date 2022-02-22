import { Task } from ".prisma/client";

export type TaskList = {
  tasks: Task[];
  title: string;
}
