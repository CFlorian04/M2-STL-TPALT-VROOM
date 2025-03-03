import { Component, type OnInit } from "@angular/core"
import type { Router } from "@angular/router"
import type { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
    })
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}

