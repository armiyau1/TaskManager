import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { TaskManager } from "./taskManager";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const taskManager = new TaskManager();

app.use(cors());
app.use(express.json());

/** Add a new task */
app.post("/tasks", (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const task = taskManager.addTask(title, description);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

/** Get all tasks (optional filter by status) */
app.get("/tasks", (req: Request, res: Response) => {
  const { status } = req.query;
  const tasks = taskManager.listTasks(status as any);
  res.json(tasks);
});

/** Get a task by ID */
app.get("/tasks/:id", (req: Request, res: Response) => {
  try {
    const task = taskManager.getTaskById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

/** Update task status */
app.patch("/tasks/:id", (req: Request, res: Response) => {
  try {
    const { newStatus } = req.body;
    const task = taskManager.updateTaskStatus(req.params.id, newStatus);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

/** Delete a task */
app.delete("/tasks/:id", (req: Request, res: Response) => {
  try {
    taskManager.deleteTask(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

/** Start the server */
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
