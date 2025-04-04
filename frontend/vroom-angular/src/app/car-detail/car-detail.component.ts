import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../services/car/car.service';
import * as Rellax from 'rellax';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit, OnDestroy {
  allCars: any[] = [];
  car: any = {};
  carId: string;
  loading: boolean = true;
  error: string = null;
  features: string[] = [];
  similarCars: any[] = [];
  Math = Math; // Make Math available in template

  constructor(
      private route: ActivatedRoute,
      private carService: CarService,
      private modalService: NgbModal
  ) { }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.route.paramMap.subscribe(params => {
      this.carId = params.get('id');
      this.loadCarDetails();
    });

    // Initialize the car object
    this.car = {
      id: this.carId,
      marque: '',
      model: '',
      annee: '',
      prix: 0,
      description: '',
      specifications: {
        moteur: '',
        puissance: '',
        transmission: '',
        carburant: '',
        consommation: ''
      },
      image: 'assets/img/no_image.png',
      disponible: true
    };

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  loadCarDetails() {
    this.loading = true;
    this.error = null;

    console.log('Loading car details for ID:', this.carId);

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

          console.log('All cars data:', this.allCars);

          // Find the car with the matching ID
          const carData = this.allCars.find(car => car.id == this.carId);
          console.log('Car data:', carData);

          this.car = {
            id: carData.id,
            marque: carData.marque,
            model: carData.model,
            annee: carData.annee,
            prix: carData.prix,
            description: carData.description || 'Découvrez cette magnifique voiture, parfaite pour tous vos déplacements. Confortable, économique et fiable.',
            specifications: {
              moteur: carData.moteur || '2.0L Turbo',
              puissance: carData.puissance || '200 CV',
              transmission: carData.transmission || 'Automatique',
              carburant: carData.carburant || 'Essence',
              consommation: carData.consommation || '7.5L/100km'
            },
            image: carData.image ? (carData.image) : 'assets/img/no_image.png',
            disponible: carData.disponible !== undefined ? carData.disponible : true
          };

          // Generate some features based on car data
          this.features = [
            'Climatisation',
            'Système de navigation GPS',
            'Bluetooth',
            'Caméra de recul',
            'Sièges chauffants'
          ];

          // Load similar cars
          this.loadSimilarCars();

          this.loading = false;
        },
        error => {
          console.error('Error fetching car details', error);
          this.error = 'Impossible de charger les détails de la voiture. Veuillez réessayer plus tard.';
          this.loading = false;
        }
    );
  }

  loadSimilarCars() {
    this.carService.getCars().subscribe(
        data => {
          // Filter to get similar cars (same brand or similar price)
          this.similarCars = data
              .filter(c => c.id !== this.car.id && (c.marque === this.car.marque || Math.abs(c.prix - this.car.prix) < 20))
              .slice(0, 3)
              .map(car => ({
                id: car.id,
                marque: car.marque,
                model: car.model,
                annee: car.annee,
                prix: car.prix,
                image: car.image ? (car.image) : 'assets/img/no_image.png',
              }));
        },
        error => {
          console.error('Error fetching similar cars', error);
        }
    );
  }

  openReservationDialog() {
    if (!this.car.disponible) {
      return;
    }

    const modalRef = this.modalService.open(ReservationDialogComponent);
    modalRef.componentInstance.car = this.car;

    modalRef.result.then((result) => {
      if (result) {
        console.log(`Vous avez réservé la ${this.car.marque} ${this.car.model} du ${result.startDate} au ${result.endDate}!`);
        // Add reservation logic here
      }
    }).catch((error) => {
      if (error !== 'Cross click' && error !== 'escape key press') {
        console.error('Erreur lors de la réservation', error);
      }
    });
  }
}

