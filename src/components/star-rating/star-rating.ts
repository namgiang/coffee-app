import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { UserService, UserFlavorService } from '../../services/index';
  
@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.scss']
})
 
export class StarRating {
  @Input() flavorId: number;
  @Input() temp: boolean; // if the star-rating is a component of the flavor-dialog
  rating: number = 0;
  idName: string;
  @Output() ratingIsChanged: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService,
              private userFlavorService: UserFlavorService) {}

  ngOnInit() {
    this.setRating();
    if (this.temp) {
      this.idName = 'Temp';
    } else {
      this.idName = '' + this.flavorId;
    }
  }

  setRating(): void {
    this.userFlavorService.getById(this.userService.currentUser().id, this.flavorId).subscribe(userFlavor => {
      if (userFlavor) {
          this.rating = userFlavor.rating;
      }
    });
  }

  rate(index) {
    let userFlavor = {
      userId: this.userService.currentUser().id,
      flavorId: this.flavorId,
      rating: index
    }
    if (!this.temp) {
      this.userFlavorService.createOrUpdate(userFlavor);
      this.setRating();
    } else {
      this.rating = index;
      this.ratingIsChanged.emit({ rating: index });
    }
  }

}
