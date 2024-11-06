import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AddressComponent } from './address/address.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Correct import for CommonModule
import { ReactiveFormsModule } from '@angular/forms'; // Correct import for ReactiveFormsModule
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CountriesService } from '../services/countries.service';


@Component({
  selector: 'app-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,     
    ReactiveFormsModule,   
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    AddressComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'] 
})

export class UserComponent {
  userForm: FormGroup;
  addresses: any[] = [{}];
  
  constructor(private fb: FormBuilder, private countriesService: CountriesService) { // קונסטרוקטור של הרכיב
    this.userForm = this.fb.group({ // יוצר טופס חדש עם FormBuilder
      name: ['', Validators.required], // שדה 'שם' עם דרישה לא מכילה
      birthdate: [''] // שדה 'תאריך לידה' (אינו חובה)
    });
  }

  onAddEmptyAddress() { // פונקציה להוספת כתובת ריקה לרשימת הכתובות
    this.addresses.push({filled: false}); // דוחף כתובת לא ממולאת לרשימה
  }

  onAddressAdded(addressIndex: number, address: any) { // פונקציה המעבירה כתובת למלאה לפי אינדקס
    this.addresses[addressIndex] = {...address, filled: true}; // מעדכן את הכתובת שנבחרה כעת עם ערכים חדשים וסימן שהיא ממולאת
  }

  onAddressRemoved(addressIndex: number) { // פונקציה להסרת כתובת מהרשימה
    this.addresses.splice(addressIndex, 1); // Removes the address at the specified index from the addresses array
  }

  onSubmit() { // פונקציה שמופעלת בעת שליחת הטופס
    if (this.userForm.valid && this.countriesService.isValidAddress) { // בודק אם הטופס תקף ואם הכתובת תקפה
      const userData = { // יוצרת אובייקט נתוני משתמשים
        ...this.userForm.value, // כוללת את ערכי הטופס
        addresses: this.addresses // מוסיפה את הכתובות
      };
      this.countriesService.addPerson(userData).subscribe((data) => { // שולחת את הנתונים לשירות
        console.log(data); // מדפיס את הנתונים שהתקבלו
        this.countriesService.refreshtable.next(true); // מעדכן שהטבלה זקוקה לרענון
      });
      
    }
  }

}
