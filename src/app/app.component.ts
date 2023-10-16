import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from './shared/user.service';
import { IUser } from './shared/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  users: IUser[];
  editedUser: IUser|null = null;
  isInCreationState: boolean = false;
  isInEditingState: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers() {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IUser[]) => this.users = data);
  }

  onUserCreated(user: IUser) {
    this.userService.addUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadUsers();
        this.isInCreationState = false;
      });
  }

  onUserEdited(user: IUser) {
    this.userService.updateUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadUsers();
        this.isInEditingState = false;
        this.editedUser = null;
      });
  }

  onFormCanceled() {
    this.isInCreationState = false;
    this.isInEditingState = false;
    this.editedUser = null;
  }

  createUser() {
    this.isInCreationState = true;
    this.isInEditingState = false;
    this.editedUser = null;
  }

  editUser(user: IUser) {
    this.editedUser = this.users.find((u) => u.id == user.id)!;
    this.isInCreationState = false;
    this.isInEditingState = true;
  }

  deleteUser(user: IUser) {
    this.userService.deleteUser(user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadUsers());
  }
}
