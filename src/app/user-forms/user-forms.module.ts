import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    EditUserFormComponent,
    CreateUserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    EditUserFormComponent,
    CreateUserFormComponent
  ]
})
export class UserFormsModule { }
