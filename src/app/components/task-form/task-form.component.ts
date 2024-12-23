import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  @Input() task: Task | null = null;
  @Output() onSubmit = new EventEmitter<Task>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required, Validators.minLength(3), Validators.maxLength(15)],
      status: ['To Do', Validators.required, Validators.minLength(5), Validators.maxLength(30)]
    });
  }

  ngOnChanges(): void {
    if (this.task) {
      this.form.patchValue(this.task);
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      const newTask = { ...this.form.value, id: this.task?.id ?? Date.now() };
      this.onSubmit.emit(newTask);
      this.form.reset();
    }
  }
}