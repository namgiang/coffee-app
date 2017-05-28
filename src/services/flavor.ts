import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class FlavorService {
    constructor(private http: Http) { }

    getAll(departmentId, userId): Observable<any> {
      return this.http.get(`/api/flavors/${departmentId}/${userId}`).map((response: Response) => response.json());
    }

    search(term, type, departmentId, userId): Observable<any> {
      return this.http.get(`/api/flavors/${departmentId}/${userId}/?term=${term}&type=${type}`).map((response: Response) => response.json());
    }

    create(flavor) {
        return this.http.post('/api/flavors', flavor, this.jwt()).map((response: Response) => response.json());
    }

    update(flavor) {
        return this.http.post(`/api/flavors/${flavor.id}`, flavor, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/departments/' + id, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
      let headers = new Headers({'Content-Type': 'application/json'});
      return new RequestOptions({ headers: headers });
    }
}
