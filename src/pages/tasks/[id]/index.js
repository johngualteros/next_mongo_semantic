import { Container, Grid, Button, Confirm, Loader } from "semantic-ui-react";
import Error from "next/error";
import { useState } from "react";
import { useRouter } from "next/router";
const Task = ({ task, error }) => {
  const { query, push } = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async () => {
    try {
      const { id } = query;
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = () => {
    setLoading(true);
    deleteTask();
    close();
    push("/");
  };

  if (error && error.status)
    return <Error statusCode={error.status} title={error.statusText} />;
  return (
    <Container>
      <Grid centered verticalAlign="middle" style={{ height: "80vh" }}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <div>
              <Button inverted color="purple" onClick={open} loading={loading}>
                Delete
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Confirm
          header="please confirm"
          content="you are sure you want to delete this task"
          open={confirm}
          onConfirm={handleDelete}
          onCancel={close}
        />
      </Grid>
    </Container>
  );
};
export default Task;
export async function getServerSideProps({ query }) {
  const response = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
  if (response.status === 200) {
    const task = await response.json();
    return {
      props: {
        task,
      },
    };
  }
  return {
    props: {
      error: {
        status: response.status,
        statusText: "invalidId",
      },
    },
  };
}
