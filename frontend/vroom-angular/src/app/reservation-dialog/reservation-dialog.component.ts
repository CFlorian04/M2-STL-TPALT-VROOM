import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  standalone: true,
  styleUrls: ['./reservation-dialog.component.scss']
})
export class ReservationDialogComponent {

  @Input() car: any;
  endDate: any;
  startDate: any;

  constructor(public activeModal: NgbActiveModal) {}
}
