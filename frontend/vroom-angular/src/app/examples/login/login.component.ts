import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    data: Date = new Date();
    focus: boolean;
    focus1: boolean;
    loginForm: FormGroup;
    isLoading = false;
    error: string = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        // Redirect if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/vehicles']);
            return;
        }

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    onLogin() {
        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.error = null;

        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.authService.login(email, password).subscribe(
            response => {
                this.isLoading = false;
                this.router.navigate(['/vehicles']);
            },
            errorMessage => {
                this.isLoading = false;
                this.error = errorMessage;
            }
        );
    }

    // Helper methods for form validation
    get emailControl() { return this.loginForm.get('email'); }
    get passwordControl() { return this.loginForm.get('password'); }
    
    hasError(controlName: string, errorName: string) {
        return this.loginForm.get(controlName).hasError(errorName) && 
               this.loginForm.get(controlName).touched;
    }
}

