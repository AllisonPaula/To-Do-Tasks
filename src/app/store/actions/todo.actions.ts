import { createAction, props } from '@ngrx/store';
import { Task } from '../../interfaces/todo.interface';

export const loadTasks = createAction('[Todo] Load Tasks');
export const loadTasksSuccess = createAction('[Todo] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Todo] Load Tasks Failure', props<{ error: string }>());
export const addTask = createAction('[Todo] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Todo] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Todo] Delete Task', props<{ taskId: number }>());
export const selectTaskForEdit = createAction('[Todo] Select Task For Edit', props<{ taskId: number }>());
export const updateTaskFromEditForm = createAction('[Todo] Update Task From Edit Form', props<{ task: Task }>());