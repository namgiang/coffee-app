import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Flavor } from '../../models/index';

import { DepartmentService } from '../../services/index';

interface IFlavor {
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
  flavor: IFlavor;
  constructor(public dialogRef: MdDialogRef<FlavorDialog>,
              public departmentService: DepartmentService) {}

  ngOnInit() {
    this.flavor = {
      name: '',
      type: '',
      departmentId: this.departmentService.currentDepartment().id
    }
  }


}
