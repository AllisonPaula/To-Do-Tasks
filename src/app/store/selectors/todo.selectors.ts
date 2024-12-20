import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducers';

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectAllTasks = createSelector(
  selectTodoState,
  (state: TodoState) => state.tasks
);

export const selectSelectedTask = createSelector(
  selectTodoState,
  (state: TodoState) => state.selectedTask
);
