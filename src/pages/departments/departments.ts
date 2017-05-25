import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable }        from 'rxjs/Observable';

@Component({
  selector: 'my-departments',
  templateUrl: './departments.html',
  styleUrls: ['./departments.scss'],
})

export class DepartmentsPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

}
