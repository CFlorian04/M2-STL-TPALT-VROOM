import { Component } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router } from "@angular/router"
import type { AuthService } from "../../services/auth.service"
import type { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup
  isLoading = false
  hidePassword = true

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true
      const { email, password } = this.loginForm.value

      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false
          this.snackBar.open("Login successful!", "Close", {
            duration: 3000,
          })
          this.router.navigate(["/"])
        },
        error: (error) => {
          this.isLoading = false
          this.snackBar.open(error.message || "Login failed. Please try again.", "Close", {
            duration: 5000,
          })
        },
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}

