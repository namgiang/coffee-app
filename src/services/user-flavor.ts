import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class UserFlavorService {
    constructor(private http: Http) { }

    getById(userId, flavorId) {
      return this.http.get(`/api/user-flavors/${userId}/${flavorId}`).map((response: Response) => response.json());
    }

    createOrUpdate(userFlavor) {
        return this.http.post('/api/user-flavors', userFlavor, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/departments/' + id, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
      let headers = new Headers({'Content-Type': 'application/json'});
      return new RequestOptions({ headers: headers });
    }
}
