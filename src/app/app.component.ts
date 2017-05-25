import { Component, OnInit} from '@angular/core';

import { User } from '../models/user';
import { UserService, EmitterService } from '../services/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;
  users: User[] = [];
  subscription;

  constructor(private userService: UserService,
              private emitterService: EmitterService) {
    this.subscription = this.emitterService.subscribe(msg => {
      console.log(msg);
      if (msg === 'user:loggedIn') {
        this.setCurrentUser();
      }
    });

  }

  ngOnInit() {
    this.setCurrentUser();
    // this.loadAllUsers();
  }

  ngOnDestroy() {
    console.log("{3}");
    this.subscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

  setCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
