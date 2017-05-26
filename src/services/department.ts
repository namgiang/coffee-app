import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Department } from '../models/index';

@Injectable()
export class DepartmentService {
    constructor(private http: Http) { }

    getAll() {
      return this.http.get('/api/departments').map((response: Response) => response.json());
    }

    create(department: Department) {
        return this.http.post('/api/departments', department, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
      let headers = new Headers({'Content-Type': 'application/json'});
      return new RequestOptions({ headers: headers });
    }
}
