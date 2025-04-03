import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'https://m2-stl-tpalt-vroom.onrender.com';
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public user: any;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(email: string, mot_de_passe: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, mot_de_passe })
            .pipe(
                tap(response => {
                    // Store the user details and token in local storage
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    this.currentUserSubject.next(response);
                })
            );
    }

    logout(): void {
        // Remove the user details and token from local storage
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isLoggedIn(): boolean {
        // Check if the user details exist in local storage
        return !!localStorage.getItem('currentUser');
    }

    register(prenom: String, nom: String, email: string, mot_de_passe: string): Observable<any> {
        let role = "user";
        console.log('Registering user:', prenom, nom, email, mot_de_passe);
            return this.http.post<any>(`${this.apiUrl}/auth/register`, { prenom, nom, email, mot_de_passe, role })
                .pipe(
                    tap(response => {
                        // Store the user details and token in local storage
                        localStorage.setItem('currentUser', JSON.stringify(response));
                        this.currentUserSubject.next(response);
                    })
                );
        }
}