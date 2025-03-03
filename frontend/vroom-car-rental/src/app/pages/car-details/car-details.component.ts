import { Component, type OnInit } from "@angular/core"
import type { ActivatedRoute, Router } from "@angular/router"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { CarService } from "../../services/car.service"
import type { ReservationService } from "../../services/reservation.service"
import type { AuthService } from "../../services/auth.service"
import type { Car } from "../../models/car.model"
import type { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: "app-car-details",
  templateUrl: "./car-details.component.html",
  styleUrls: ["./car-details.component.css"],
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null
  isLoading = true
  isLoggedIn = false
  reservationForm: FormGroup
  minDate = new Date()
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private reservationService: ReservationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.reservationForm = this.fb.group(
      {
        startDate: ["", [Validators.required]],
        endDate: ["", [Validators.required]],
        pickupLocation: ["", [Validators.required]],
      },
      { validator: this.dateRangeValidator },
    )
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
    })

    const carId = this.route.snapshot.paramMap.get("id")
    if (carId) {
      this.carService.getCarById(Number.parseInt(carId)).subscribe({
        next: (car) => {
          this.car = car
          this.isLoading = false
        },
        error: (error) => {
          console.error("Error fetching car details", error)
          this.isLoading = false
          this.snackBar.open("Car not found or error loading details", "Close", {
            duration: 5000,
          })
          this.router.navigate(["/cars"])
        },
      })
    }
  }

  dateRangeValidator(group: FormGroup) {
    const start = group.get("startDate")?.value
    const end = group.get("endDate")?.value

    if (start && end) {
      const startDate = new Date(start)
      const endDate = new Date(end)

      if (startDate >= endDate) {
        return { dateRange: true }
      }
    }

    return null
  }

  calculateTotalPrice(): number {
    if (!this.car) return 0

    const startDate = this.reservationForm.get("startDate")?.value
    const endDate = this.reservationForm.get("endDate")?.value

    if (!startDate || !endDate) return 0

    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    return days * this.car.pricePerDay
  }

  onSubmit(): void {
    if (!this.isLoggedIn) {
      this.snackBar.open("Please login to reserve a car", "Close", {
        duration: 3000,
      })
      this.router.navigate(["/login"])
      return
    }

    if (this.reservationForm.valid && this.car) {
      const { startDate, endDate, pickupLocation } = this.reservationForm.value
      const totalPrice = this.calculateTotalPrice()

      this.reservationService
        .createReservation({
          carId: this.car.id,
          startDate,
          endDate,
          pickupLocation,
          totalPrice,
        })
        .subscribe({
          next: () => {
            this.snackBar.open("Reservation created successfully!", "Close", {
              duration: 3000,
            })
            this.router.navigate(["/reservations"])
          },
          error: (error) => {
            console.error("Error creating reservation", error)
            this.snackBar.open("Failed to create reservation. Please try again.", "Close", {
              duration: 5000,
            })
          },
        })
    } else {
      this.reservationForm.markAllAsTouched()
    }
  }
}

