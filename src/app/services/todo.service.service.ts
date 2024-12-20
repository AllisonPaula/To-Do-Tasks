import { Injectable } from '@angular/core';
import { Task } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private localStorageKey = 'tasks';

  getTasksFromLocalStorage(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  addTaskToLocalStorage(task: Task): void {
    const tasks = this.getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  updateTaskInLocalStorage(updatedTask: Task): void {
    const tasks = this.getTasksFromLocalStorage();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    }
  }

  deleteTaskFromLocalStorage(taskId: number): void {
    const tasks = this.getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedTasks));
  }
}