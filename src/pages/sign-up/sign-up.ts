import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { UserService, AuthenticationService, EmitterService } from '../../services/index';
import { AlertComponent } from '../../components/alert/alert';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up.html',
  styleUrls: ['../login/login.scss'],
})

export class SignUpPage {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private emitterService: EmitterService,
        private dialog: MdDialog) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                  this.authenticationService.login(this.model.username, this.model.password)
                    .subscribe(
                        data => {
                            this.emitterService.next('user:loggedIn');
                            this.router.navigate(['/']);
                        },
                        error => {
                            let message = { text: 'Incorrect username or password!', type: 'error' }
                            this.openAlert(message);
                    });
                },
                error => {
                    let message = { text: "Registration failed. Please try again!", type: 'error'};
                    this.openAlert(message);
                    this.loading = false;
                });
    }

    openAlert(message): void {
        let dialogRef = this.dialog.open(AlertComponent, {
          hasBackdrop: true,
          backdropClass: 'my-overlay',
          data: message
        });
  }
}
