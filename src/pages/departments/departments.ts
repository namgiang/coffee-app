import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogModule } from '@angular/material';

import { DepartmentService } from '../../services/index';

import { NewDepartmentDialog } from '../../components/new-department-dialog/new-department-dialog';

@Component({
  selector: 'departments-page',
  templateUrl: './departments.html',
  styleUrls: ['./departments.scss']
})

export class DepartmentsPage implements OnInit {
  departments: any[] = [];
  newDepartmentClicked: boolean = false;

  constructor(private router: Router,
              private departmentService: DepartmentService,
              private dialog: MdDialog) {}

  ngOnInit(): void {
    this.departmentService.getAll().subscribe(departments => { this.departments = departments; });
  }

  addNewDepartment() {
    let dialogRef = this.dialog.open(NewDepartmentDialog, {
      hasBackdrop: true,
      backdropClass: 'my-overlay'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.departmentService.create(result)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    });
  }

}
