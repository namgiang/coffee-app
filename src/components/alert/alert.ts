import { Component, Inject } from '@angular/core';
 
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
 
@Component({
  selector: 'alert-component',
  templateUrl: './alert.html',
  styleUrls: ['./alert.scss']
})
 
export class AlertComponent {
  constructor(public dialogRef: MdDialogRef<AlertComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {}
}
