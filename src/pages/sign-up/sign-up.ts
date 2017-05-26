import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { UserService } from '../../services/index';
import { AlertComponent } from '../../components/alert/alert';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
})

export class SignUpPage {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private dialog: MdDialog) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // this.alertService.success('Registration successful', true);
                    let message = { text: "Registration successful!", type: 'success'};
                    this.openAlert(message);
                    this.router.navigate(['/login']);
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
