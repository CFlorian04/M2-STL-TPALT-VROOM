import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {ExamplesModule} from './examples/examples.module';

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {VehiclesComponent} from './vehicles/vehicles.component';
import {HttpClientModule} from "@angular/common/http";
import {ReservationDialogComponent} from './reservation-dialog/reservation-dialog.component';
import {RegisterComponent} from './examples/register/register.component';
import {CarService} from "./services/car/car.service";
import {CarDetailComponent} from "./car-detail/car-detail.component";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        VehiclesComponent,
        RegisterComponent,
        CarDetailComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ReservationDialogComponent,
        ExamplesModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
