import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  cars: any[] = [
    {
      id: 1,
      brand: 'Toyota',
      name: 'Corolla',
      description: 'A reliable and efficient sedan.',
      price: 20000,
      color: 'Red',
      transmission: 'Automatic',
      type: 'Sedan',
      year: 2021,
      processedImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/...'
    },
    {
      id: 2,
      brand: 'Honda',
      name: 'Civic',
      description: 'A sporty and compact car.',
      price: 22000,
      color: 'Blue',
      transmission: 'Manual',
      type: 'Hatchback',
      year: 2022,
      processedImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/...'
    }
  ];

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    // Comment out the following line to use default data for testing
    // this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe(res => {
      res.forEach((car: any) => {
        car.processedImage = `data:image/jpeg;base64,${car.returnedImage}`;
        this.cars.push(car);
      });
    });
  }

  deleteCar(id: number) {
    this.adminService.deleteCar(id).subscribe(res => {
      this.cars = this.cars.filter(car => car.id !== id);
      this.message.success('Car deleted successfully', { nzDuration: 3000 });
    });
  }
}
