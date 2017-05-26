import { Component, Inject } from '@angular/core';
 
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
 
@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss']
})
 
export class ConfirmDialog {
  constructor(public dialogRef: MdDialogRef<ConfirmDialog>,
              @Inject(MD_DIALOG_DATA) public data: any) {}
}
