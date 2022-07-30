import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { Button, Card, Container, Grid, Segment } from "semantic-ui-react";
export default function HomePage({ tasks }) {
  const router = useRouter();
  if (tasks.length === 0) {
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Segment>
              <h1>No tasks found</h1>
              <img
                src="https://img.freepik.com/vector-gratis/ilustracion-concepto-fallo-conexion_114360-536.jpg?w=2000"
                alt=""
                width="400"
              />
              <div>
                <Button
                  inverted
                  color="blue"
                  onClick={() => router.push("/tasks/new")}
                >
                  Create your first Task
                </Button>
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return (
    <Container style={{padding: "20px"}}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <Card.Meta>{task.description}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Segment inverted>
                <Button inverted color="blue" onClick={()=>router.push(`/tasks/${task._id}/edit`)}>
                  Edit
                </Button>
                <Button inverted color="red" onClick={()=>router.push(`/tasks/${task._id}`)}>
                  View
                </Button>
              </Segment>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const response = await fetch("http://localhost:3000/api/tasks");
  const tasks = await response.json();

  return {
    props: {
      tasks,
    },
  };
};
