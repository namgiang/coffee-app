import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { FlavorService } from '../../services/index';
// import { Flavor } from '../../models/index';

import { NewDepartmentDialog } from '../../components/new-department-dialog/new-department-dialog';
import { AlertComponent } from '../../components/alert/alert';

@Component({
  selector: 'flavors-page',
  templateUrl: './flavors.html',
  styleUrls: ['./flavors.scss']
})

export class FlavorsPage implements OnInit {
  flavors: any[] = [];
  // newDepartmentClicked: boolean = false;
  // message: {text: string, type: string};

  constructor(private router: Router,
              private flavorService: FlavorService,
              private route: ActivatedRoute,
              private dialog: MdDialog) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.flavorService.getAll(+params['id']))
      .subscribe(flavors => this.flavors = flavors);
    // this.flavorService.getAll().subscribe(flavors => { this.flavors = flavors; });
  }

  addFlavor() {
    // let dialogRef = this.dialog.open(NewDepartmentDialog, {
    //   hasBackdrop: true,
    //   backdropClass: 'my-overlay'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.departmentService.create({name: result})
    //         .subscribe(
    //             data => {
    //               this.message = { text: "New department '" + result + "' created!", type: 'success' };
    //               this.openAlert(this.message);
    //             },
    //             error => {
    //               this.message = { text: "Department '" + result + "' already exists!", type: 'error' };
    //               this.openAlert(this.message);
    //             });
    // });
  }

  openAlert(message): void {
    let dialogRef = this.dialog.open(AlertComponent, {
      hasBackdrop: true,
      backdropClass: 'my-overlay',
      data: message
    });
  }
}
