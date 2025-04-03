import { Injectable } from "@angular/core"
import type { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import type { AuthService } from "./auth.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue

    if (currentUser) {
      // User is logged in
      return true
    }

    // User is not logged in, redirect to login page with return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } })
    return false
  }
}

