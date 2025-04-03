import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from '../services/car/car.service';
import * as Rellax from 'rellax';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  allCars: any[] = [];
  cars: any[] = [];
  loading: boolean = true;
  error: string = null;
  
  // Filtering and sorting
  filterForm: FormGroup;
  brands: string[] = [];
  years: number[] = [];
  
  constructor(
    private carService: CarService, 
    private modalService: NgbModal,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    console.log(this.carService);

    // Initialize filter form
    this.filterForm = this.fb.group({
      brand: [''],
      year: [''],
      priceRange: [''],
      sortBy: ['']
    });

    // Subscribe to form changes
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    // Load cars
    this.loadCars();
  }

  ngOnDestroy(): void {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  loadCars(): void {
    this.loading = true;
    this.error = null;

    this.carService.getCars().subscribe(
      data => {
        this.allCars = data.map(car => ({
          id: car.id,
          marque: car.marque,
          model: car.modele,
          annee: car.annee,
          prix: car.prix_par_jour,
          image: car.image_voiture ? (`data:image/png;base64,${car.image_voiture}`) : 'assets/img/no_image.png',
          disponible: car.disponible !== undefined ? car.disponible : true
        }));
        
        // Extract unique brands and years for filters
        this.brands = Array.from(new Set(this.allCars.map(car => car.marque))).sort((a, b) => b - a);
        this.years = Array.from(new Set(this.allCars.map(car => car.annee))).sort((a, b) => b - a);

        // Apply initial filters
        this.applyFilters();
        
        this.loading = false;
      },
      error => {
        console.error('Erreur lors de la récupération des voitures', error);
        this.error = 'Impossible de charger les voitures. Veuillez réessayer plus tard.';
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    
    // Start with all cars
    let filteredCars = this.allCars.slice();
    
    // Apply brand filter
    if (filters.brand) {
      filteredCars = filteredCars.filter(car => car.marque === filters.brand);
    }
    
    // Apply year filter
    if (filters.year) {
      filteredCars = filteredCars.filter(car => car.annee === parseInt(filters.year));
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'under50':
          filteredCars = filteredCars.filter(car => car.prix < 50);
          break;
        case '50to100':
          filteredCars = filteredCars.filter(car => car.prix >= 50 && car.prix <= 100);
          break;
        case '100to200':
          filteredCars = filteredCars.filter(car => car.prix > 100 && car.prix <= 200);
          break;
        case 'over200':
          filteredCars = filteredCars.filter(car => car.prix > 200);
          break;
      }
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'priceAsc':
          filteredCars.sort((a, b) => a.prix - b.prix);
          break;
        case 'priceDesc':
          filteredCars.sort((a, b) => b.prix - a.prix);
          break;
        case 'yearDesc':
          filteredCars.sort((a, b) => b.annee - a.annee);
          break;
        case 'yearAsc':
          filteredCars.sort((a, b) => a.annee - b.annee);
          break;
        case 'brandAsc':
          filteredCars.sort((a, b) => a.marque.localeCompare(b.marque));
          break;
      }
    }
    
    this.cars = filteredCars;
  }

  resetFilters(): void {
    this.filterForm.reset({
      brand: '',
      year: '',
      priceRange: '',
      sortBy: ''
    });
  }

  openReservationDialog(car: any): void {
    if (!car.disponible) {
      return;
    }
    
    const modalRef = this.modalService.open(ReservationDialogComponent);
    modalRef.componentInstance.car = car;

    modalRef.result.then((result) => {
      if (result) {
        console.log(`Vous avez réservé la ${car.marque} ${car.model} du ${result.startDate} au ${result.endDate}!`);
        // Add reservation logic here
      }
    }).catch((error) => {
      if (error !== 'Cross click' && error !== 'escape key press') {
        console.error('Erreur lors de la réservation', error);
      }
    });
  }

  viewCarDetails(carId: string): void {
    this.router.navigate(['/vehicles', carId]);
  }
}

