import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogModule } from '@angular/material';

import { AlertComponent } from '../../components/alert/alert';

import { AuthenticationService, EmitterService } from '../../services/index';

@Component({
    selector: 'login-page',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})

export class LoginPage implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    @Output() userLoggedIn: EventEmitter<any> = new EventEmitter();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private emitterService: EmitterService,
        private dialog: MdDialog) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                this.emitterService.next('user:loggedIn');
                this.router.navigate([this.returnUrl]);
            },
            error => {
                let message = { text: 'Incorrect username or password!', type: 'error' }
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
