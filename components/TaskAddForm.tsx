import { Formik, Field, Form } from 'formik'
import { Stack, FormControl, Input, Button } from '@chakra-ui/react'
import { gql, useMutation } from '@apollo/client'
import { AllTasksQuery } from './TaskList'
import { Select } from "@chakra-ui/react";
import styles from '../styles/TaskAddForm.module.scss';

const CreateTaskMutation = gql`
  mutation CreateTask($title: String!, $priority: Int!) {
    createTask(title: $title, priority: $priority) {
      id
      title
      done
      priority
    }
  }
`;

const TaskAddForm: React.FC = () => {
  const [createTask, { error }] = useMutation(CreateTaskMutation, {
    refetchQueries: [AllTasksQuery],
  })

  const handleSubmit = (title: string, priority: Number, resetForm: () => void) => {
    console.log("title : " + title + " priority : " + priority);
    if (!title) return
    createTask({
      variables: {
        title: title,
        priority: priority
      },
    })
    resetForm()
  }

  if (error) return <p>Error: {error.message}</p>

  return (
    <Formik
      initialValues={{ title: "", priority: 1 }}
      onSubmit={(value, actions) =>
        handleSubmit(value.title, Number(value.priority), actions.resetForm)
      }
    >
      <Form>
        <Stack direction="row" className={styles.l_taskAddForm}>
          <div className={styles.formContent}>
            <Field name="title" className={styles.formContent}>
              {({ field }: any) => (
                <FormControl>
                  <Input
                    {...field}
                    id="title"
                    type="text"
                    placeholder="タスク名"
                  />
                </FormControl>
              )}
            </Field>
          </div>
          <div className={styles.formContent}>
            <Field
              as="select"
              name="priority"
              className={`${styles.formContent} ${styles.formSelect}`}
            >
              <option value="1">優先度：高</option>
              <option value="2">優先度：中</option>
              <option value="3">優先度：低</option>
            </Field>
          </div>
          <Button
            colorScheme="teal"
            type="submit"
            className={styles.formContent}
          >
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}

export default TaskAddForm
