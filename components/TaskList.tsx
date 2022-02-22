import { gql, useQuery, useMutation } from "@apollo/client";
import { Task } from ".prisma/client";
import { Checkbox, List, ListItem } from "@chakra-ui/react";
import styles from '../styles/TaskList.module.scss';
import TaskDeleteButton from "./TaskDeleteButton";

export const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      done
    }
  }
`;

const UpdateTaskMutation = gql`
  mutation UpdateTask($id: Int!, $title: String!, $done: Boolean!) {
    updateTask(id: $id, title: $title, done: $done) {
      id
    }
  }
`

const TaskList: React.FC = () => {
  const { data, loading, error } = useQuery(AllTasksQuery);
  const [updateTask, mutation] = useMutation(UpdateTaskMutation, {
    refetchQueries: [AllTasksQuery]
  })

  const handleCheckboxClick = (task: Task) => {
    updateTask({
      variables: {
        id: task.id,
        title: task.title,
        done: !task.done, // checkを変更
      },
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (mutation.error) return <p>Error: {mutation.error.message}</p>;

  // id順にsort
  const tasks = [...data.tasks].sort((a: Task, b: Task) => b.id - a.id);

  return (
    <List className={styles.l_taskList}>
      {tasks.map((task: any) => (
        <ListItem key={task.id} className={styles.taskContent}>
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
    </List>
  );
};

export default TaskList;
