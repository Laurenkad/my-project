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
  
  constructor(private fb: FormBuilder, private countriesService: CountriesService) { 
    this.userForm = this.fb.group({ 
      name: ['', Validators.required],
      birthdate: ['']
    });
  }

  onAddEmptyAddress() { 
    this.addresses.push({filled: false});
  }

  onAddressAdded(addressIndex: number, address: any) { 
    this.addresses[addressIndex] = {...address, filled: true};
  }

  onAddressRemoved(addressIndex: number) { 
    this.addresses.splice(addressIndex, 1);
  }

  onSubmit() {
    if (this.userForm.valid && this.countriesService.isValidAddress) {
      const userData = {
        ...this.userForm.value,
        addresses: this.addresses
      };
      this.countriesService.addPerson(userData).subscribe((data) => {
        console.log(data);
        this.countriesService.refreshtable.next(true);
      });
      
    }
  }

}
