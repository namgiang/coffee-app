import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, EmitterService } from '../../services/index';

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
        private alertService: AlertService,
        private emitterService: EmitterService) { }

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
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
