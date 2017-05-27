import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { DepartmentService } from '../../services/index';
import { Department } from '../../models/index';

import { NewDepartmentDialog } from '../../components/new-department-dialog/new-department-dialog';
import { AlertComponent } from '../../components/alert/alert';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'departments-page',
  templateUrl: './departments.html',
  styleUrls: ['./departments.scss']
})

export class DepartmentsPage implements OnInit {
  departments: any[] = [];
  newDepartmentClicked: boolean = false;
  message: {text: string, type: string};

  constructor(private router: Router,
              private departmentService: DepartmentService,
              private dialog: MdDialog) {}

  ngOnInit(): void {
    this.departmentService.getAll().subscribe(departments => { this.departments = departments; });
  }

  addDepartment() {
    let dialogRef = this.dialog.open(NewDepartmentDialog, {
      hasBackdrop: true,
      backdropClass: 'my-overlay'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.departmentService.create({name: result})
            .subscribe(
                data => {
                  this.message = { text: "New department '" + result + "' created!", type: 'success' };
                  this.openAlert(this.message);
                },
                error => {
                  this.message = { text: "Department '" + result + "' already exists!", type: 'error' };
                  this.openAlert(this.message);
                });
    });
  }

  openAlert(message): void {
    let dialogRef = this.dialog.open(AlertComponent, {
      hasBackdrop: true,
      backdropClass: 'my-overlay',
      data: message
    });
  }

  openConfirmDialog(department): void {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      hasBackdrop: true,
      backdropClass: 'my-overlay',
      data: { text: "Are you sure you want to delete '" + department.name + "' department?"  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.deleteDepartment(department.id);
      }
    });
  }

  setCurrentDepartment(department) {
    localStorage.setItem('currentDepartment', JSON.stringify(department));
  }

  deleteDepartment(id: number) {
    this.departmentService.delete(id);
  }
}
