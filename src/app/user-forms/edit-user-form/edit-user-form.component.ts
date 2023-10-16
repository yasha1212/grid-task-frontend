import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/user.model';

@Component({
  selector: 'edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit, OnChanges{
  @Input() user: IUser;
  @Output() onSubmit = new EventEmitter<IUser>();
  @Output() onCancel = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges){
    if (this.form) {
      this.form.controls['id'].setValue(this.user.id);
      this.form.controls['firstName'].setValue(this.user.firstName);
      this.form.controls['lastName'].setValue(this.user.lastName);
      this.form.controls['email'].setValue(this.user.email);
    }
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
      id: [this.user.id],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }
}
