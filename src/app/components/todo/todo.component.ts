import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, StatusTask } from '../../interfaces/todo.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTaskForEdit } from '../../store/actions/todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input() task!: Task;
  @Output() onUpdate = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() updatedTask = new EventEmitter<StatusTask>();

  constructor(private router: Router, private store: Store) { }

  editTask(): void {
    if (this.task.id) {
      this.store.dispatch(selectTaskForEdit({ taskId: this.task.id }));
      this.router.navigate(['/edit', this.task.id]);
    } else {
      this.router.navigate(['**']);
    }
  }

  deleteTask(): void {
    this.onDelete.emit(this.task.id);
  }

  updateStatus(status: StatusTask): void {
    const updatedTask = { ...this.task, status };
    this.onUpdate.emit(updatedTask);
  }
}