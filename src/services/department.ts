import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class DepartmentService {
    constructor(private http: Http) { }

    getAll() {
      return this.http.get('/api/departments').map((response: Response) => response.json());
    }

    create(department) {
        return this.http.post('/api/departments', department, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/departments/' + id, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
      let headers = new Headers({'Content-Type': 'application/json'});
      return new RequestOptions({ headers: headers });
    }
}
