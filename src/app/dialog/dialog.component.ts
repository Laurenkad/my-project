import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [
    CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatDialogActions,FormsModule,MatDialogModule
  ],
})
export class DialogComponent {
  cityName: string = '';  // Variable to hold the input city name

  constructor(public dialogRef: MatDialogRef<any>) {}

  // Method to handle the addition of the city
  addCity() {
    if (this.cityName.trim()) {
      // Pass the cityName back to the parent component
      this.dialogRef.close(this.cityName);
    } else {
      alert("City name cannot be empty.");
    }
  }
}
