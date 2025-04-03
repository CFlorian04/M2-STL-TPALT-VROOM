import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    data: Date = new Date();
    focus: boolean;
    focus1: boolean;
    focus2: boolean;
    focus3: boolean;
    registerForm: FormGroup;
    isLoading = false;
    error: string = null;
    success: string = null;

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

        this.registerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
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

    onRegister() {
        if (this.registerForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.error = null;
        this.success = null;

        const { firstName, lastName, email, password } = this.registerForm.value;

        this.authService.register(firstName, lastName, email, password).subscribe(
            response => {
                this.isLoading = false;
                this.success = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
                
                // Redirect to login after a short delay
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 2000);
            },
            errorMessage => {
                this.isLoading = false;
                this.error = errorMessage;
            }
        );
    }

    // Helper methods for form validation
    get firstNameControl() { return this.registerForm.get('firstName'); }
    get lastNameControl() { return this.registerForm.get('lastName'); }
    get emailControl() { return this.registerForm.get('email'); }
    get passwordControl() { return this.registerForm.get('password'); }
    
    hasError(controlName: string, errorName: string) {
        return this.registerForm.get(controlName).hasError(errorName) && 
               this.registerForm.get(controlName).touched;
    }
}

