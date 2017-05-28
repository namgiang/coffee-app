import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { AuthenticationService, UserService, EmitterService } from '../services/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;
  users: User[] = [];
  subscription;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private emitterService: EmitterService,
              private router: Router) {
    this.subscription = this.emitterService.subscribe(msg => {
      if (msg === 'user:loggedIn') {
        this.setCurrentUser();
      }
    });

  }

  ngOnInit() {
    this.setCurrentUser();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut(): void {
    this.authenticationService.logout();
    this.setCurrentUser();
    this.router.navigate(['/login']);
  }
}
