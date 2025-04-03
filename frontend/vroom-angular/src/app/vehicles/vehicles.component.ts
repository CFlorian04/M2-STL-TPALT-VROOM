import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rellax from 'rellax';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  cars: any[] = [];

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    // Appel à l'API pour récupérer la liste des voitures
    this.http.get<any[]>('https://m2-stl-tpalt-vroom.onrender.com/cars/models').subscribe(
        data => {
          console.log(data);
          this.cars = data.map(car => ({
            marque: car.marque,
            model: car.modele,
            annee: car.annee,
            prix: car.prix_par_jour,
            image: car.image_voiture ? (`data:image/png;base64,${car.image_voiture}`) : 'assets/img/no_image.png',
          }));
        },
        error => {
          console.error('Erreur lors de la récupération des voitures', error);
        }
    );
  }

  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  openReservationDialog(car: any): void {
    const modalRef = this.modalService.open(ReservationDialogComponent);
    modalRef.componentInstance.car = car;

    modalRef.result.then((result) => {
      if (result) {
        console.log(`Vous avez réservé la ${car.marque} ${car.model} du ${result.startDate} au ${result.endDate}!`);
        // Ajoutez ici la logique de réservation
      }
    }).catch((error) => {
      console.error('Erreur lors de la réservation', error);
    });
  }
}
