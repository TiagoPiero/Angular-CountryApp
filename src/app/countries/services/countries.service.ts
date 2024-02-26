import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { Country } from '../interfaces/country,';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode( code: string): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError( error => of(null)) //si hay un error (no se encuentra ningun pais) agarra el error y devuelve como observable el null
    )
  }

  searchCapital(term: string): Observable<Country[]> {

  const url = `${ this.apiUrl }/capital/${ term }`
  return this.http.get<Country[]>(url)
  .pipe(
    catchError( error => of([])) //si hay un error (no se encuentra ningun pais) agarra el error y devuelve como observable el arreglo vacio
  );
  }

  searchCountry( term: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( error => of([]))
      )
  }

  searchRegion( region: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( error => of([]))
    )
  }
}

