import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.scss']
})
export class GetBookingsComponent implements OnInit {
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

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    // Comment out the following line to use default data for testing
    // this.getBookings();
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.adminService.changeBookingStatus(bookingId, status).subscribe(
      () => {
        this.getBookings();
        this.message.success('Booking status changed successfully');
      },
      error => {
        this.message.error('Error changing booking status');
      }
    );
  }

  private getBookings() {
    this.isSpinning = true;

    this.adminService.getCarBookings().subscribe(bookings => {
      this.bookings = bookings;
      this.isSpinning = false;
    });
  }
}
