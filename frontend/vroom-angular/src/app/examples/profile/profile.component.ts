import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rellax from 'rellax';
import { AuthService } from '../../services/auth/auth.service';
import { CarService } from '../../services/car/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
  data: Date = new Date();
  focus: boolean;
  focus1: boolean;
  
  user: any;
  profileForm: FormGroup;
  isLoading = false;
  isUpdating = false;
  error: string = null;
  success: string = null;
  
  reservations: any[] = [];
  loadingReservations = false;
  reservationError: string = null;
  
  activeTab = 1; // 1 = Profile, 2 = Reservations

  constructor(
    private authService: AuthService,
    private carService: CarService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    
    // Initialize form
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
    
    // Load user data
    this.loadUserData();
    
    // Load user reservations
    this.loadUserReservations();
  }
  
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  
  loadUserData() {
    this.isLoading = true;
    this.error = null;
    
    // Get user from auth service
    //this.user = this.authService.currentUserValue;
    
    if (this.user) {
      // Populate form with user data
      this.profileForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email
      });
      
      this.isLoading = false;
    } else {
      this.error = 'Impossible de charger les données utilisateur.';
      this.isLoading = false;
    }
  }
  
  loadUserReservations() {
    this.loadingReservations = true;
    this.reservationError = null;
    
    // this.carService.getUserReservations().subscribe(
    //   data => {
    //     this.reservations = data;
    //     this.loadingReservations = false;
    //   },
    //   error => {
    //     console.error('Error loading reservations', error);
    //     this.reservationError = 'Impossible de charger vos réservations.';
    //     this.loadingReservations = false;
    //   }
    // );
  }
  
  onUpdateProfile() {
    if (this.profileForm.invalid) {
      return;
    }
    
    this.isUpdating = true;
    this.error = null;
    this.success = null;
    
    const userData = this.profileForm.value;
    
    // this.authService.updateUserProfile(userData).subscribe(
    //   response => {
    //     this.isUpdating = false;
    //     this.success = 'Profil mis à jour avec succès.';
    //   },
    //   error => {
    //     this.isUpdating = false;
    //     this.error = 'Erreur lors de la mise à jour du profil.';
    //   }
    // );
  }
  
  setActiveTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }
  
  // Helper methods for form validation
  hasError(controlName: string, errorName: string) {
    return this.profileForm.get(controlName).hasError(errorName) && 
           this.profileForm.get(controlName).touched;
  }
}

