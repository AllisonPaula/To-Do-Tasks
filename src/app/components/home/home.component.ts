import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/todo.interface';
import { loadTasks, addTask, updateTask, deleteTask, selectTaskForEdit } from '../../store/actions/todo.actions';
import { selectAllTasks, selectSelectedTask } from '../../store/selectors/todo.selectors';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  tasks$: Observable<Task[]>;
  title = 'To-Do List';
  searchForm: FormGroup;
  searchTerm: string = '';

  constructor(private store: Store, private router: Router, private fb: FormBuilder) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());

    this.searchForm.get('query')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchTerm = query;
    });
  }

  addTask(task: Task): void {
    const newTask = { ...task, id: task.id ?? Date.now() };
    this.store.dispatch(addTask({ task: newTask }));
  }

  updateTask(task: Task): void {
    this.store.dispatch(updateTask({ task }));
  }

  deleteTask(taskId: number): void {
    this.store.dispatch(deleteTask({ taskId }));
  }

  editTask(taskId: number): void {
    this.router.navigate(['/edit', taskId]);
  }

  logout(): void {
    this.router.navigate(['/']);
  }
}