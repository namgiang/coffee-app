import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { MdDialog } from '@angular/material';

import { FlavorService, DepartmentService, UserService, UserFlavorService } from '../../services/index';
import { Flavor } from '../../models/index';

import { FlavorDialog } from '../../components/flavor-dialog/flavor-dialog';
import { AlertComponent } from '../../components/alert/alert';

@Component({
  selector: 'flavors-page',
  templateUrl: './flavors.html',
  styleUrls: ['./flavors.scss']
})

export class FlavorsPage implements OnInit {
  @ViewChild('searchBox') searchBox;
  flavors: Flavor[] = [];
  flavorsObservable: Observable<Flavor[]>;
  departmentId: any;
  sub: any;
  coffee: boolean = true;
  tea: boolean = true;
  typeFilter: string = 'all';
  searchTerms = new Subject<string>();
  currentUserId: number;

  constructor(private router: Router,
              private flavorService: FlavorService,
              private userService: UserService,
              private userFlavorService: UserFlavorService,
              private route: ActivatedRoute,
              private dialog: MdDialog) {}

  ngOnInit(): void {
    this.currentUserId = this.userService.currentUser().id;
    this.sub = this.route.params
      .subscribe((params: Params) => { this.departmentId = +params['id'] });

    this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap((term) => term
        ? this.flavorService.search(term, this.typeFilter, this.departmentId, this.currentUserId)
        : this.flavorService.getAll(this.departmentId, this.currentUserId)
      ).subscribe(flavors => this.flavors = flavors);

    this.flavorService.getAll(this.departmentId, this.currentUserId)
        .subscribe(flavors => this.flavors = flavors);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addOrEditFlavor(flavor) {
    let dialogRef = this.dialog.open(FlavorDialog, {
      hasBackdrop: true,
      backdropClass: 'my-overlay',
      data: flavor
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.flavor.id) {
        this.flavorService.update(result.flavor)
            .subscribe(
                data => {
                  if (result.rating) {
                    let userFlavor = {
                      userId: this.currentUserId,
                      flavorId: result.flavor.id,
                      rating: result.rating
                    }
                    this.userFlavorService.createOrUpdate(userFlavor);
                    this.flavorService.getAll(this.departmentId, this.currentUserId)
                        .subscribe(flavors => this.flavors = flavors);
                  }
                },
                error => {
                  let message = { text: "Flavor '" + result.name + "' cannot be updated!", type: 'error' };
                  this.openAlert(message);
                });

      } else {
        this.flavorService.create(result.flavor)
            .subscribe(
                data => {
                  this.flavors.push(data);
                  let message = { text: "New Flavor '" + result.flavor.name + "' created!", type: 'success' };
                  this.openAlert(message);
                },
                error => {
                  let message = { text: "Flavor '" + result.flavor.name + "' already exists!", type: 'error' };
                  this.openAlert(message);
                });
      }
    });
  }

  openAlert(message): void {
    let dialogRef = this.dialog.open(AlertComponent, {
      hasBackdrop: true,
      backdropClass: 'my-overlay',
      data: message
    });
  }

  filterType() {
    this.flavorService.search(this.searchBox.nativeElement.value, this.typeFilter, this.departmentId, this.currentUserId).subscribe(flavors => this.flavors = flavors);
  }

  search(term: string): void {
    const searchTerm = term.replace(/ /g, '+');
    this.searchTerms.next(searchTerm);
  }

  heart(flavorId) {
    this.userFlavorService.getById(this.currentUserId, flavorId).toPromise().then(result => {
      let userFlavor;
      if (result) {
        userFlavor = result;
        userFlavor.hearted = !result.hearted || false;
      } else {
        userFlavor = {
          userId: this.currentUserId,
          flavorId: flavorId,
          hearted: true
        }
      }
      this.userFlavorService.createOrUpdate(userFlavor).toPromise().then(data => {
        this.flavorService.getAll(this.departmentId, this.currentUserId)
        .subscribe(flavors => this.flavors = flavors);
      });
    });
  }

}
