import { gql, useQuery, useMutation } from "@apollo/client";
import { Task } from ".prisma/client";
import { List } from "@chakra-ui/react";
import styles from '../styles/TaskList.module.scss';
import { TaskText } from "./TaskText";

export const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      done
      priority
    }
  }
`;


const TaskList: React.FC = () => {
  const { data, loading, error } = useQuery(AllTasksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // id順にsort
  const tasks = [...data.tasks].sort((a: Task, b: Task) => b.id - a.id);

  // 優先度順にフィルター
  const tasksList = [
    {
      tasks: tasks.filter(task => task.priority === 1),
      title: "優先度：高"
    },
    {
      tasks: tasks.filter(task => task.priority === 2),
      title: "優先度：中"
    },{
      tasks: tasks.filter(task => task.priority === 3),
      title: "優先度：低"
    }
  ]

  console.log(tasksList)

  return (
    <List className={styles.l_taskList}>
      {tasksList.map((list) =>
        <TaskText key={list.title} list={list} />
      )}
    </List>
  );
};

export default TaskList;
