import { Grid, Paper, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect, useContext  } from "react";
import axios from "axios";
import LoginContext from "../store/loginContext";
import { useParams } from "react-router-dom";

const GradePage = () => {
  const { id}= useParams();
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [file, setFile] = useState(null);
  const { login } = useContext(LoginContext);
  const grade = parseInt(id, 10);
  useEffect(() => {
    // Fetch tasks for the selected grade
    axios
      .get(`/grades/${grade}/tasks`)
      .then(({ data }) => {
        setTasks(data);
      })
      .catch((err) => {
        console.log("Error fetching tasks:", err);
      });
  }, [grade]);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleAddTask = async () => {
    if (!newTaskDescription.trim()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", newTaskDescription);
      if (file) {
        formData.append("file", file);
      }

      const { data } = await axios.post(`/grades/${grade}/tasks`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTasks([...tasks, data]);
      setNewTaskDescription('');
      setFile(null);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {login && login.isBusiness && (
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Add New Task
            </Typography>
            <TextField
              label="Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <input type="file" onChange={handleFileUpload} style={{ marginBottom: 16 }} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTask}
              disabled={!newTaskDescription.trim() || !file}
            >
              Add Task
            </Button>
          </Paper>
        </Grid>
      )}

      <Grid item xs={12}>
        {tasks.map((task) => (
          <Paper key={task.id} elevation={3} style={{ padding: 16, marginTop: 16, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <Typography variant="body1" gutterBottom>
              {task.description}
            </Typography>
            {task.file && (
              <a href={task.file} target="_blank" rel="noopener noreferrer">
                View File
              </a>
            )}
          </Paper>
        ))}
      </Grid>
    </Grid>
  );
};

export default GradePage;
