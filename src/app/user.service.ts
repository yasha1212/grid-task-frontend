import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Array<User>;

  constructor() {
    this.users = new Array<User>();
    this.users = [
      {
        id: 1,
        firstName: "Max",
        lastName: "Max",
        email: "email1@gmail.com"
      },
      {
        id: 2,
        firstName: "Gleb",
        lastName: "Gleb",
        email: "email2@gmail.com"
      }
    ];
   }

  getUsers() {
    return [...this.users];
  }

  addUser(user: User) {
    this.users.push(user);
  }

  updateUser(user: User) {
    let index = this.users.findIndex((u) => u.id === user.id);
    this.users[index].firstName = user.firstName;
    this.users[index].lastName = user.lastName;
    this.users[index].email = user.email;
  }

  deleteUser(id: number) {
    let index = this.users.findIndex((u) => u.id === id);
    this.users.splice(index, 1);
  }
}
