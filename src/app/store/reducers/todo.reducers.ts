import { createReducer, on } from '@ngrx/store';
import { loadTasksSuccess, addTask, updateTask, deleteTask, loadTasks, selectTaskForEdit, updateTaskFromEditForm } from '../actions/todo.actions';
import { Task } from '../../interfaces/todo.interface';

export interface TodoState {
  tasks: Task[];
  selectedTask: Task | null;
}

export const initialState: TodoState = {
  tasks: [],
  selectedTask: null
};

export const todoReducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({ ...state })),
  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(addTask, (state, { task }) => {
    const updatedTasks = [...state.tasks, { ...task, id: task.id ?? Date.now() }];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { ...state, tasks: updatedTasks };
  }),
  on(updateTask, (state, { task }) => {
    const updatedTasks = state.tasks.map(t => t.id === task.id ? task : t);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { ...state, tasks: updatedTasks };
  }),
  on(updateTaskFromEditForm, (state, { task }) => {
    const updatedTasks = state.tasks.map(t => t.id === task.id ? task : t);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { ...state, tasks: updatedTasks, selectedTask: null };
  }),
  on(deleteTask, (state, { taskId }) => {
    const updatedTasks = state.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { ...state, tasks: updatedTasks };
  }),
  on(selectTaskForEdit, (state, { taskId }) => ({
    ...state,
    selectedTask: state.tasks.find(task => task.id === taskId) || null
  }))
);