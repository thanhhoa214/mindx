import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorldPopulation, CountryNamesParams, CountryPopulation, Pagination, CountriesParams } from '@xmind/model';

const API_URL = 'http://localhost:3333/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  worldPopulation$ = this.http.get<WorldPopulation>(`${API_URL}/world-population`);

  getCountries(params?: CountriesParams) {
    return this.http.get<Pagination<CountryPopulation>>(`${API_URL}/countries`, { params: { ...params } });
  }

  getCountryNames(params?: CountryNamesParams) {
    return this.http.get<Pagination<string>>(`${API_URL}/country-names`, { params: { ...params } });
  }

  getCountryPopulationByName(name: string) {
    return this.http.get<CountryPopulation>(`${API_URL}/country`, { params: { name } });
  }
}
