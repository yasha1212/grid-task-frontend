import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
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

  users: Array<User>;
  editedUser: User|null = null;

  constructor(private userService: UserService) {
    this.users = new Array<User>();
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
    this.users = this.userService.getUsers();
  }

  chooseTemplate(user: User) {
    if (this.editedUser && this.editedUser.id === user.id) {
      return this.editableRow;
    } else {
      return this.readonlyRow;
    }
  }

  addUser() {
    
  }

  editUser(user: User) {
    this.editedUser = user;
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id);
    this.loadUsers();
  }

  saveChanges() {
    this.userService.updateUser(this.editedUser as User);
    this.editedUser = null;
    this.loadUsers();
  }

  cancelChanges() {
    this.editedUser == null;
  }
}
