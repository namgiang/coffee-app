import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'new-department-dialog',
  templateUrl: './new-department-dialog.html',
  styleUrls: ['./new-department-dialog.scss']
})

export class NewDepartmentDialog {
  constructor(public dialogRef: MdDialogRef<NewDepartmentDialog>) {}
}
