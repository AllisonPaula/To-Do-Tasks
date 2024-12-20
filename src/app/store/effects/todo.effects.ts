import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import * as TodoActions from '../actions/todo.actions';
import { TodoService } from '../../services/todo.service.service';
import { loadTasks, loadTasksSuccess, loadTasksFailure } from '../actions/todo.actions';
import { Task } from '../../interfaces/todo.interface';
import { of } from 'rxjs';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() => {
        try {
          const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
          return of(loadTasksSuccess({ tasks }));
        } catch (error) {
          return of(loadTasksFailure({ error: 'Failed to load tasks from local storage' }));
        }
      })
    )
  );

  addTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.addTask),
        tap(({ task }) => this.todoService.addTaskToLocalStorage(task))
      ),
    { dispatch: false }
  );

  updateTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.updateTask),
        tap(({ task }) => this.todoService.updateTaskInLocalStorage(task))
      ),
    { dispatch: false }
  );

  deleteTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.deleteTask),
        tap(({ taskId }) => this.todoService.deleteTaskFromLocalStorage(taskId))
      ),
    { dispatch: false }
  );
}