import { Component, type OnInit } from "@angular/core"
import type { CarService } from "../../services/car.service"
import type { Car } from "../../models/car.model"
import type { Router } from "@angular/router"
import type { AuthService } from "../../services/auth.service"
import type { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  featuredCars: Car[] = []
  isLoading = true
  isLoggedIn = false

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
    })

    this.carService.getFeaturedCars().subscribe({
      next: (cars) => {
        this.featuredCars = cars
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error fetching featured cars", error)
        this.isLoading = false
      },
    })
  }

  reserveCar(carId: number): void {
    if (this.isLoggedIn) {
      this.router.navigate(["/cars", carId])
    } else {
      this.snackBar.open("Please login to reserve a car", "Close", {
        duration: 3000,
      })
      this.router.navigate(["/login"])
    }
  }
}

