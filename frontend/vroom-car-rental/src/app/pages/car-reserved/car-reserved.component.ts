import { Component, type OnInit } from "@angular/core"
import type { ReservationService } from "../../services/reservation.service"
import type { Reservation } from "../../models/reservation.model"
import type { MatSnackBar } from "@angular/material/snack-bar"
import type { MatDialog } from "@angular/material/dialog"

@Component({
  selector: "app-car-reserved",
  templateUrl: "./car-reserved.component.html",
  styleUrls: ["./car-reserved.component.css"],
})
export class CarReservedComponent implements OnInit {
  reservations: Reservation[] = []
  isLoading = true

  constructor(
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadReservations()
  }

  loadReservations(): void {
    this.reservationService.getUserReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error fetching reservations", error)
        this.isLoading = false
        this.snackBar.open("Failed to load reservations. Please try again.", "Close", {
          duration: 5000,
        })
      },
    })
  }

  cancelReservation(reservationId: number): void {
    // Confirm dialog would be implemented here
    this.reservationService.cancelReservation(reservationId).subscribe({
      next: () => {
        this.snackBar.open("Reservation cancelled successfully", "Close", {
          duration: 3000,
        })
        this.loadReservations()
      },
      error: (error) => {
        console.error("Error cancelling reservation", error)
        this.snackBar.open("Failed to cancel reservation. Please try again.", "Close", {
          duration: 5000,
        })
      },
    })
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "status-confirmed"
      case "pending":
        return "status-pending"
      case "completed":
        return "status-completed"
      case "cancelled":
        return "status-cancelled"
      default:
        return ""
    }
  }
}

