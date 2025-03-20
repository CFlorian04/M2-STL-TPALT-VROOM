import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CustomerRoutingModule } from './customer-routing.module'
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component'
import { NgZorroImportsModule } from '../../NgZorroImportsModule'
import { BookCarComponent } from './components/book-car/book-car.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component'
import { MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { MatList, MatListItem } from '@angular/material/list'

@NgModule({
  declarations: [CustomerDashboardComponent, BookCarComponent, MyBookingsComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgZorroImportsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatProgressSpinner,
    MatGridList,
    MatGridTile,
    MatList,
    MatListItem
  ]
})
export class CustomerModule {}
