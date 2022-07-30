import { useState,useEffect } from "react";
import { Form, Grid, Button } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function TaskForm() {
  const {query,push} = useRouter();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(false);

  const validate = () => {
    const errors = {};
    if (!newTask.title) {
      errors.title = "Title is required";
    }
    if (!newTask.description) {
      errors.description = "Description is required";
    }
    return errors;
  };
  const editTask =async () => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask)
      })
    } catch (error) {
      console.log(error);
    }
  }
  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) {
      return setErrors(errors);
    }
    if (!query.id) {
      await createTask();
    }else{
      await editTask();
    }
    await push("/");
  };
  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };
  const getTask=async()=>{
    const res = await fetch("http://localhost:3000/api/tasks/"+query.id)
    const task = await res.json()
    setNewTask(task)
  }
  useEffect(() => {
    if (query.id){
      getTask()
    }
  },[])
  return (
    <Grid
      centered
      verticalAlign="middle"
      style={{ height: "80vh" }}
      columns={3}
    >
      <Grid.Row>
        <Grid.Column>
          <h1>{query.id?'Edit Task':'Create Task'}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              onChange={handleChange}
              name="title"
              value={newTask.title}
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              onChange={handleChange}
              name="description"
              value={newTask.description}
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "below" }
                  : null
              }
            />
            <Button type="submit" primary>
              Save
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
