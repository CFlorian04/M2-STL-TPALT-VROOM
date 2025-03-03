import { Component, Input, Output, EventEmitter } from "@angular/core"
import type { Car } from "../../models/car.model"
import type { Router } from "@angular/router"

@Component({
  selector: "app-car-card",
  templateUrl: "./car-card.component.html",
  styleUrls: ["./car-card.component.css"],
})
export class CarCardComponent {
  @Input() car!: Car
  @Input() showReserveButton = true
  @Output() reserve = new EventEmitter<number>()

  constructor(private router: Router) {}

  viewDetails(): void {
    this.router.navigate(["/cars", this.car.id])
  }

  reserveCar(): void {
    this.reserve.emit(this.car.id)
  }
}

