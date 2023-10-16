import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/user.model';

@Component({
  selector: 'create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent {
  @Output() onSubmit = new EventEmitter<IUser>();
  @Output() onCancel = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  submitForm() {
    this.onSubmit.emit(this.form.value);
  }

  cancelForm() {
    this.onCancel.emit();
  }

  getEmailErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'Email is required!';
    }

    return this.form.controls['email'].hasError('email') ? 'Not a valid email!' : '';
  }

  private createForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
}
