import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Flavor } from '../../models/index';

import { DepartmentService } from '../../services/index';

interface IFlavor {
  id?: number;
  name: string;
  type: string;
  departmentId: number;
}

@Component({
  selector: 'flavor-dialog',
  templateUrl: './flavor-dialog.html',
  styleUrls: ['./flavor-dialog.scss']
})

export class FlavorDialog {
  editedFlavor: IFlavor;
  type: string;
  name: string;
  rating: number;

  constructor(public dialogRef: MdDialogRef<FlavorDialog>,
              @Inject(MD_DIALOG_DATA) public data: any,
              public departmentService: DepartmentService) {}

  ngOnInit() {
    if (this.data) {
      this.editedFlavor = this.data;
      this.name = this.editedFlavor.name;
      this.type = this.editedFlavor.type;
    } else {
      console.log('jjjj');
      this.editedFlavor = {
        name: '',
        type: 'coffee',
        departmentId: this.departmentService.currentDepartment().id
      }
      this.type = this.editedFlavor.type;
    }
  }

  setRating(event) {
    this.rating = event.rating;
  }

  addOrUpdate() {
    this.editedFlavor.name = this.name;
    this.editedFlavor.type = this.type;
    this.dialogRef.close({flavor: this.editedFlavor, rating: this.rating });
  }
}
