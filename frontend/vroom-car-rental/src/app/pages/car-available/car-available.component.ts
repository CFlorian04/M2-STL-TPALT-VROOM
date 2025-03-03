import { Component, type OnInit } from "@angular/core"
import type { FormBuilder, FormGroup } from "@angular/forms"
import type { CarService } from "../../services/car.service"
import type { Car } from "../../models/car.model"
import type { Router } from "@angular/router"
import type { AuthService } from "../../services/auth.service"
import type { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: "app-car-available",
  templateUrl: "./car-available.component.html",
  styleUrls: ["./car-available.component.css"],
})
export class CarAvailableComponent implements OnInit {
  cars: Car[] = []
  filteredCars: Car[] = []
  isLoading = true
  isLoggedIn = false
  filterForm: FormGroup

  makes: string[] = []
  models: string[] = []
  years: number[] = []
  transmissions: string[] = []
  fuelTypes: string[] = []

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.filterForm = this.fb.group({
      make: [""],
      model: [""],
      year: [""],
      transmission: [""],
      fuelType: [""],
      minPrice: [""],
      maxPrice: [""],
    })
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
    })

    this.carService.getAvailableCars().subscribe({
      next: (cars) => {
        this.cars = cars
        this.filteredCars = [...cars]
        this.isLoading = false
        this.extractFilterOptions()
      },
      error: (error) => {
        console.error("Error fetching available cars", error)
        this.isLoading = false
      },
    })

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters()
    })
  }

  extractFilterOptions(): void {
    this.makes = [...new Set(this.cars.map((car) => car.make))]
    this.models = [...new Set(this.cars.map((car) => car.model))]
    this.years = [...new Set(this.cars.map((car) => car.year))].sort((a, b) => b - a)
    this.transmissions = [...new Set(this.cars.map((car) => car.transmission))]
    this.fuelTypes = [...new Set(this.cars.map((car) => car.fuelType))]
  }

  applyFilters(): void {
    const filters = this.filterForm.value

    this.filteredCars = this.cars.filter((car) => {
      return (
        (!filters.make || car.make === filters.make) &&
        (!filters.model || car.model === filters.model) &&
        (!filters.year || car.year === Number.parseInt(filters.year)) &&
        (!filters.transmission || car.transmission === filters.transmission) &&
        (!filters.fuelType || car.fuelType === filters.fuelType) &&
        (!filters.minPrice || car.pricePerDay >= filters.minPrice) &&
        (!filters.maxPrice || car.pricePerDay <= filters.maxPrice)
      )
    })
  }

  resetFilters(): void {
    this.filterForm.reset()
    this.filteredCars = [...this.cars]
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

