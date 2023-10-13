import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { IUser } from './user';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('readOnlyRow') readonlyRow!: TemplateRef<any>;
  @ViewChild('editableRow') editableRow!: TemplateRef<any>;

  createUserForm: FormGroup;

  users: IUser[] = [];
  editedUser: IUser|null = null;

  constructor(private userService: UserService) {
    this.createUserForm = new FormGroup({
      "firstName": new FormControl(),
      "lastName": new FormControl(),
      "email": new FormControl()
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers()
      .subscribe((data: IUser[]) => this.users = data);
  }

  chooseTemplate(user: IUser) {
    if (this.editedUser && this.editedUser.id === user.id) {
      return this.editableRow;
    } else {
      return this.readonlyRow;
    }
  }

  addUser() {
    
  }

  editUser(user: IUser) {
    this.editedUser = user;
  }

  deleteUser(user: IUser) {
    this.userService.deleteUser(user.id)
      .subscribe(() => this.loadUsers());
  }

  saveChanges() {
    this.userService.updateUser(this.editedUser as IUser)
      .subscribe(() => {
        this.editedUser = null;
        this.loadUsers();
      });
  }

  cancelChanges() {
    this.editedUser == null;
  }
}
