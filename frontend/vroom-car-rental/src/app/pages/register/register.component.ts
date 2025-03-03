import { Component } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router } from "@angular/router"
import type { AuthService } from "../../services/auth.service"
import type { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerForm: FormGroup
  isLoading = false
  hidePassword = true
  hideConfirmPassword = true

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validator: this.checkPasswords },
    )
  }

  checkPasswords(group: FormGroup) {
    const password = group.get("password")?.value
    const confirmPassword = group.get("confirmPassword")?.value
    return password === confirmPassword ? null : { notMatching: true }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true
      const { firstName, lastName, email, password } = this.registerForm.value

      this.authService.register(firstName, lastName, email, password).subscribe({
        next: () => {
          this.isLoading = false
          this.snackBar.open("Registration successful! Please login.", "Close", {
            duration: 3000,
          })
          this.router.navigate(["/login"])
        },
        error: (error) => {
          this.isLoading = false
          this.snackBar.open(error.message || "Registration failed. Please try again.", "Close", {
            duration: 5000,
          })
        },
      })
    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}

