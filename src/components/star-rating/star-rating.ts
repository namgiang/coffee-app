import { Component, ViewChild, Input } from '@angular/core';

import { UserService, UserFlavorService } from '../../services/index';
  
@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.scss']
})
 
export class StarRating {
  @Input() flavorId: number;
  star5Checked: boolean = false;
  rating: number = 0;

  constructor(private userService: UserService,
              private userFlavorService: UserFlavorService) {}

  ngOnInit() {
    this.setRating();
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
    this.userFlavorService.createOrUpdate(userFlavor);
    this.setRating();
  }

}
