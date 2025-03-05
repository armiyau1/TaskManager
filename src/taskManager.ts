import { v4 as uuidv4 } from "uuid";

/** Task status type */
type Status = "open" | "in-progress" | "closed";

/** Task interface */
interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}

  class TaskManager {
  private tasks: Task[] = [];


  addTask(title: string, description: string): Task {
    if (!title || !description) throw new Error("Title and description are required.");

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: "open",
    };

    this.tasks.push(newTask);
    return newTask;
  }

  /** Deletes a task */
  deleteTask(id: string): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) throw new Error("Task not found.");
    this.tasks.splice(index, 1);
  }


  updateTaskStatus(id: string, newStatus: Status): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) throw new Error("Task not found.");
    if (!["open", "in-progress", "closed"].includes(newStatus)) throw new Error("Invalid status.");

    task.status = newStatus;
    return task;
  }

  listTasks(filterStatus?: Status): Task[] {
    return filterStatus ? this.tasks.filter(task => task.status === filterStatus) : this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) throw new Error("Task not found.");
    return task;
  }
}

export { TaskManager, Task, Status };
