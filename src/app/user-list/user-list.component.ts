import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import {MatTableModule} from '@angular/material/table';

interface Address {
  addressName: string;
  street: string;
  city: string;
  country: string;
}

interface User {
  id: number;
  name: string;
  birthdate: string;
  addresses: Address[];
}
@Component({
  selector: 'user-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  constructor(private countriesService: CountriesService) {} 
dataSource: User[] = []; 
displayedColumns: string[] = ['Id', 'name', 'birthdate', 'addresses']; // העמודות להצגה בטבלה


ngOnInit(): void { 
  this.initData(); 
  this.countriesService.refreshtable.subscribe((data) => { 
    if (data) 
      this.initData(); 
  });
}

initData() { 
  this.countriesService.getPersons().subscribe((data) => { 
    this.dataSource = data; 
  });
}
}
