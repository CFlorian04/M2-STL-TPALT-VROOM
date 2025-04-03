import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    private apiUrl = 'https://m2-stl-tpalt-vroom.onrender.com';

    constructor(private http: HttpClient) {
    }

    getCars(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + '/cars/models');
    }
}
