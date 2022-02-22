import type { TaskList } from '../types/taskList';
import { Checkbox, List, ListItem } from "@chakra-ui/react";
import styles from "../styles/TaskList.module.scss";
import TaskDeleteButton from "./TaskDeleteButton";
import { gql, useMutation } from "@apollo/client";
import { AllTasksQuery } from "./TaskList";
import { Task } from ".prisma/client";

type Props = {
  list: TaskList
}

const UpdateTaskMutation = gql`
  mutation UpdateTask(
    $id: Int!
    $title: String!
    $done: Boolean!
    $priority: Int!
  ) {
    updateTask(id: $id, title: $title, done: $done, priority: $priority) {
      id
    }
  }
`;

export const TaskText = ({ list }: Props) => {
  const [updateTask, {error}] = useMutation(UpdateTaskMutation, {
    refetchQueries: [AllTasksQuery],
  });

  const handleCheckboxClick = (task: Task) => {
    updateTask({
      variables: {
        id: task.id,
        title: task.title,
        done: !task.done, // checkを変更
        priority: task.priority,
      },
    });
  };

  return (
    <div className={styles.taskContents}>
      <h2 className={styles.taskContents__priorityText}>{list.title}</h2>
      {list.tasks.map((task: any) => (
        <ListItem key={task.id} className={styles.taskContents__taskContent}>
          <Checkbox
            colorScheme="teal"
            isChecked={task.done}
            onChange={() => handleCheckboxClick(task)}
          >
            {task.title}
          </Checkbox>
          <TaskDeleteButton taskId={task.id} />
        </ListItem>
      ))}
    </div>
  );
}
