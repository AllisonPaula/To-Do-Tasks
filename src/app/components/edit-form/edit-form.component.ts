import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task, StatusTask } from '../../interfaces/todo.interface';
import { TodoState } from '../../store/reducers/todo.reducers';
import { updateTaskFromEditForm, selectTaskForEdit } from '../../store/actions/todo.actions';
import { selectSelectedTask } from '../../store/selectors/todo.selectors';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
})
export class EditFormComponent implements OnInit {
  editFormGroup: FormGroup;
  task: Task | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ todo: TodoState }>
  ) {
    this.editFormGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['To Do' as StatusTask, Validators.required]
    });
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.store.dispatch(selectTaskForEdit({ taskId: +taskId }));
      this.store.select(selectSelectedTask).subscribe(task => {
        if (task) {
          this.task = task;
          this.editFormGroup.patchValue(task);
        }
      });
    }
  }

  save(): void {
    if (this.editFormGroup.valid && this.task) {
      const updatedTask = { ...this.task, ...this.editFormGroup.value };
      this.store.dispatch(updateTaskFromEditForm({ task: updatedTask }));
      this.router.navigate(['home']);
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }


  onEditTask(task: Task): void {
    this.store.dispatch(updateTaskFromEditForm({ task }));
  }
}