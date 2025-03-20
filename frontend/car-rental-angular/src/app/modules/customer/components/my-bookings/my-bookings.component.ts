import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [
    {
      id: 1,
      bookCarStatus: 'PENDING'
    },
    {
      id: 2,
      bookCarStatus: 'APPROVED'
    },
    {
      id: 3,
      bookCarStatus: 'REJECTED'
    }
  ];

  isSpinning = false;

  constructor(private service: CustomerService) {}

  ngOnInit() {
    // Comment out the following line to use default data for testing
    // this.getBookingsByUserId();
  }

  private getBookingsByUserId() {
    this.isSpinning = true;

    this.service.getBookingsByUserId().subscribe(
      data => {
        this.bookings = data;
        this.isSpinning = false;
      },
      error => {
        console.log(error);
        this.isSpinning = false;
      }
    );
  }
}
