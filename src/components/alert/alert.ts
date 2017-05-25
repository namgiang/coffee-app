import { Component, OnInit } from '@angular/core';
 
import { AlertService } from '../../services/index';
 
@Component({
  selector: 'alert-component',
  templateUrl: './alert.html',
  styleUrls: ['./alert.scss']
})
 
export class AlertComponent {
    message: any;
 
    constructor(private alertService: AlertService) { }
 
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
