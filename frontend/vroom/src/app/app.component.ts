import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    MatButton
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material-project';
}
