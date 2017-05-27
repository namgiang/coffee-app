import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { FlavorService, DepartmentService } from '../../services/index';
import { Flavor } from '../../models/index';

import { FlavorDialog } from '../../components/flavor-dialog/flavor-dialog';
import { AlertComponent } from '../../components/alert/alert';

@Component({
  selector: 'flavors-page',
  templateUrl: './flavors.html',
  styleUrls: ['./flavors.scss']
})

export class FlavorsPage implements OnInit {
  flavors: Flavor[] = [];
  departmentId: any;
  sub: any;

  constructor(private router: Router,
              private flavorService: FlavorService,
              private route: ActivatedRoute,
              private dialog: MdDialog) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .subscribe((params: Params) => { this.departmentId = +params['id'] });

      this.flavorService.getAll(this.departmentId)
      .subscribe(flavors => this.flavors = flavors);
  }

  ngOnDestroy() {

  }

  addFlavor() {
    let dialogRef = this.dialog.open(FlavorDialog, {
      hasBackdrop: true,
      backdropClass: 'my-overlay'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.flavorService.create(result)
            .subscribe(
                data => {
                  this.flavors.push(data);
                  let message = { text: "New Flavor '" + result.name + "' created!", type: 'success' };
                  this.openAlert(message);
                },
                error => {
                  let message = { text: "Department '" + result.name + "' already exists!", type: 'error' };
                  this.openAlert(message);
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
}
