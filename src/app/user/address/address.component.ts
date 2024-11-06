import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CountriesService } from '../../services/countries.service';
import { CommonModule } from '@angular/common'; 
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
    this.addressForm.valueChanges.subscribe(() => { 
      
      this.countriesService.isValidAddress = this.addressForm.valid;
    });
  }

  removeAddress() { 
    this.addressRemoved.emit(null); 
  }

  loadCountries() { 
    this.countriesService.getCountries().subscribe( 
      (data)=> { 
        this.countries = data;
      },
      
    );
  }


  onCountryChange(countryId: number) { 
    this.loadCities(countryId); 
  }

  loadCities(countryId: number) { // פונקציה לטעינת ערים על פי מזהה המדינה
    this.countriesService.getCitiesByCountryId(countryId).subscribe( 
      data => { 
        this.cities = data;
      },
    );
  }

  addAddress() { 
    if (this.addressForm.valid) { 
      this.address = {...this.addressForm.value, filled: true} 
      console.log(this.address); 
      this.addressAdded.emit(this.addressForm.value); 
      this.addressForm.reset(); 
    }
  }





  openDialog() { // פונקציה לפתיחת חלון דיאלוג
    const dialogRef = this.dialog.open(DialogComponent); 

    dialogRef.afterClosed().subscribe(result => { 
      if (result) { 
        console.log('Install clicked!'); 
        console.log(result); 
        this.countriesService.addCity(this.countries.length + 1, result).subscribe((data) => { 
          console.log(data);
        });
        
        
      } else {
        console.log('Dialog was closed without installation.');
      }
    });
  }

}
