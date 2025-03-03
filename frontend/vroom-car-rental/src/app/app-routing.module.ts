import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { LoginComponent } from "./pages/login/login.component"
import { RegisterComponent } from "./pages/register/register.component"
import { CarAvailableComponent } from "./pages/car-available/car-available.component"
import { CarReservedComponent } from "./pages/car-reserved/car-reserved.component"
import { CarDetailsComponent } from "./pages/car-details/car-details.component"
import { AboutComponent } from "./pages/about/about.component"
import { ProfileComponent } from "./pages/profile/profile.component"
import { AuthGuard } from "./services/auth.guard"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "cars", component: CarAvailableComponent },
  { path: "reservations", component: CarReservedComponent, canActivate: [AuthGuard] },
  { path: "cars/:id", component: CarDetailsComponent },
  { path: "about", component: AboutComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

