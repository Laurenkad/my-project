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
  name: string; // Defaults to "NA" in usage if necessary
  birthdate: string; // Defaults to "NA" in usage if necessary
  addresses: Address[]; // Array of Address objects
}
@Component({
  selector: 'user-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  constructor(private countriesService: CountriesService) {} // קונסטרוקטור של הרכיב, מוזן בשירות CountriesService
dataSource: User[] = []; // משתנה שאוסף נתונים של משתמשים
displayedColumns: string[] = ['Id', 'name', 'birthdate', 'addresses']; // העמודות להצגה בטבלה

// משמש לטעינת נתונים 
// כי זו פונקציה מופעלת כשהקומפוננטה מופעלת לראשונה
ngOnInit(): void { // מופעל כאשר הרכיב מוכן
  this.initData(); // מפעיל את פונקציית initData לטעינת הנתונים
  this.countriesService.refreshtable.subscribe((data) => { // מאזין לשינויים ב-refreshtable
    if (data) // אם התקבל נתון
      this.initData(); // טוען מחדש את הנתונים
  });
}

initData() { // פונקציה לטעינת נתוני משתמשים
  this.countriesService.getPersons().subscribe((data) => { // מבצע מנוי על קריאת שירות לקבלת משתמשים
    this.dataSource = data; // מאחסן את הנתונים במשתנה dataSource
  });
}
}
