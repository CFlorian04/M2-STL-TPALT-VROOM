import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { RegisterComponent } from "./examples/register/register.component";
import { CarDetailComponent } from './car-detail/car-detail.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'index', component: ComponentsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'vehicles', component: VehiclesComponent },
    { path: 'vehicles/:id', component: CarDetailComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'your-reservations', component: ProfileComponent}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }

