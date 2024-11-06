import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { CommonModule } from '@angular/common'; // Make sure to import CommonModule
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule, 
    MatInputModule, 
    MatFormFieldModule, 
    CommonModule,
    ReactiveFormsModule, 
    NgFor
  ],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
  
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  countries: any[] = [];
  cities: any[] = [];

  @Input() address :any
  @Output() addressAdded = new EventEmitter<any>();
  @Output() addressRemoved = new EventEmitter<any>();

  //DI-הזרקה -במקום שאני אצור לבד את האובייקט
  //NEW אנגולר מאחורי הקלעים עושה את זה וחוסך לי זמן 

  constructor (private fb: FormBuilder, private countriesService: CountriesService,private dialog: MatDialog) {
    this.addressForm = this.fb.group({
      addressName: ['', Validators.required],
      country: [''],
      city: [''],
      street: ['', Validators.required]
    });
  }

  ngOnInit() { // מופעל כאשר הרכיב נטען
    this.loadCountries(); // טוענת את רשימת המדינות
    this.addressForm.valueChanges.subscribe(() => { // מנוי על שינויים בטופס כתובת
      // בדוק אם הטופס תקף ועדכן את המשתנה 'isValid'
      this.countriesService.isValidAddress = this.addressForm.valid; // מעדכן אם הכתובת תקפה
    });
  }

  removeAddress() { // פונקציה להסרת כתובת
    this.addressRemoved.emit(null); // שולח אירוע להסרת הכתובת
  }

  loadCountries() { // פונקציה לטעינת מדינות
    this.countriesService.getCountries().subscribe( // מבצע מנוי על קריאת שירות המדינות
      (data)=> { // כאשר הנתונים מתקבלים
        this.countries = data; // מאחסן את הנתונים במשתנה 'countries'
      },
      
    );
  }


  onCountryChange(countryId: number) { // מופעל כאשר המשתמש בוחר מדינה
    this.loadCities(countryId); // טוען את הערים למדינה שנבחרה
  }

  loadCities(countryId: number) { // פונקציה לטעינת ערים על פי מזהה המדינה
    this.countriesService.getCitiesByCountryId(countryId).subscribe( // מבצע מנוי על קריאת שירות הערים
      data => { // כאשר הנתונים מתקבלים
        this.cities = data; // מאחסן את הנתונים במשתנה 'cities'
      },
    );
  }

  addAddress() { // פונקציה להוספת כתובת
    if (this.addressForm.valid) { // בודק אם הטופס תקף
      this.address = {...this.addressForm.value, filled: true} // מפעיל את הכתובת עם ערכים מהטופס
      console.log(this.address); // מדפיס את הכתובת למחשב מסוף
      this.addressAdded.emit(this.addressForm.value); // שולח אירוע עם פרטי הכתובת
      this.addressForm.reset(); // מאפס את הטופס
    }
  }





  openDialog() { // פונקציה לפתיחת חלון דיאלוג
    const dialogRef = this.dialog.open(DialogComponent); // פותח חלון דיאלוג עם רכיב DialogComponent

    dialogRef.afterClosed().subscribe(result => { // מאזין לסגירת הדיאלוג
      if (result) { // אם יש תוצאה (משמעותה שהמשתמש לחץ על "התקן")
        console.log('Install clicked!'); // מדפיס שהמשתמש לחץ על התקנה
        console.log(result); // מדפיס את התוצאה שהתקבלה מהדיאלוג
        this.countriesService.addCity(this.countries.length + 1, result).subscribe((data) => { // מוסיף עיר עם מזהה חדש
          console.log(data); // מדפיס את הנתונים שהתקבלו מהשירות
        });
        
        // טיפול בפעולת ההתקנה כאן
      } else {
        console.log('Dialog was closed without installation.'); // מדפיס אם הדיאלוג נסגר ללא התקנה
      }
    });
  }

}
