import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface Country {
    id: number;
    name: string;
    cities: { id: number; name: string }[];
}

interface City {
    id: number;
    name: string;
}
@Injectable({
    providedIn: 'root'
})
export class CountriesService {
    private apiUrl = 'http://localhost:3000/api';
   refreshtable = new BehaviorSubject<boolean>(false)
   isValidAddress= false  
    constructor(private http: HttpClient) {}

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.apiUrl}/countries`);
    }

    getCitiesByCountryId(countryId: number): Observable<City[]> {
        const response =  this.http.get<City[]>(`${this.apiUrl}/cities/${countryId}`);
        return response
    }

    addCity(countryId: number, name: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/city`, { countryId, name });
    }

    getPersons(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/persons`);
    }

    addPerson(person: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/person`, person);
    }
}
