import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const API_URL = 'https://world-population.p.rapidapi.com';
const API_KEY = 'ed74e2be46msha0be35e5f345febp17ac10jsn4262a33cbe07';
const API_HOST = 'world-population.p.rapidapi.com';

const options = {
  headers: {
    'x-rapidapi-host': API_HOST,
    'x-rapidapi-key': API_KEY,
  },
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  worldPopulation$ = this.http
    .get<Response<WorldPopulation>>(`${API_URL}/worldpopulation`, options)
    .pipe(map((response) => response.body));

  allCountries$ = this.http
    .get<Response<Countries>>(`${API_URL}/allcountriesname`, options)
    .pipe(map((response) => response.body.countries));

  getCountryPopulationByName(name: string) {
    return this.http
      .get<Response<CountryPopulation>>(`${API_URL}/population?country_name=${name}`, options)
      .pipe(map((response) => response.body));
  }
}

export interface Response<T> {
  ok: boolean;
  body: T;
}

export interface WorldPopulation {
  world_population: number;
  total_countries: number;
}
export interface CountryPopulation {
  country_name: string;
  population: number;
  ranking: number;
  world_share: number;
}
export interface Countries {
  countries: string[];
}

export interface Pagination<T> {
  current_page: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  items: T[];
}
