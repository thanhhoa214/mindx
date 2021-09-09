import { API_URL, API_HOST, API_KEY } from './app.const';
import { HttpService, Injectable } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import {
  WorldPopulation,
  Response,
  Countries,
  CountryPopulation,
  CountriesParams,
  CountryNamesParams,
} from '@xmind/model';
import { forkJoin } from 'rxjs';

const options = {
  headers: {
    'x-rapidapi-host': API_HOST,
    'x-rapidapi-key': API_KEY,
  },
};

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  getWorldPopulation() {
    return this.http
      .get<Response<WorldPopulation>>(`${API_URL}/worldpopulation`, options)
      .pipe(map((response) => response.data.body));
  }

  getCountryNames(params: CountryNamesParams = { limit: 20, page: 0, q: '' }) {
    const { limit = 20, page = 0, q = '' } = params;
    const sureNumberLimit = Number(limit);
    const surePageLimit = Number(page);

    return this.http.get<Response<Countries>>(`${API_URL}/allcountriesname`, options).pipe(
      map((response) => response.data.body.countries.filter((con) => con.toLowerCase().includes(q.toLowerCase()))),
      map((countryNames) => {
        const maxItemCount = countryNames.length;
        const maxPage = Math.ceil((maxItemCount * 1.0) / sureNumberLimit) - 1;
        const countryNamesSlice = countryNames.slice(
          sureNumberLimit * surePageLimit,
          sureNumberLimit * (surePageLimit + 1)
        );
        return {
          items: countryNamesSlice,
          has_previous_page: surePageLimit > 0,
          has_next_page: surePageLimit < maxPage,
          current_page: surePageLimit,
          total: maxItemCount,
        };
      })
    );
  }
  getCountries(params: CountriesParams = { limit: 20, page: 0 }) {
    const { limit = 20, page = 0 } = params;
    const sureNumberLimit = Number(limit);
    const surePageLimit = Number(page);
    return this.http.get<Response<Countries>>(`${API_URL}/allcountriesname`, options).pipe(
      switchMap((response) => {
        const maxItemCount = response.data.body.countries.length;
        const maxPage = Math.ceil((maxItemCount * 1.0) / sureNumberLimit) - 1;

        const countryNames = response.data.body.countries.slice(
          sureNumberLimit * surePageLimit,
          sureNumberLimit * (surePageLimit + 1)
        );
        return forkJoin(countryNames.map((name) => this.getCountryByName(name))).pipe(
          map((countries) => ({
            items: countries,
            has_previous_page: surePageLimit > 0,
            has_next_page: surePageLimit < maxPage,
            current_page: surePageLimit,
            total: maxItemCount,
          }))
        );
      })
    );
  }

  getCountryByName(name: string) {
    return this.http
      .get<Response<CountryPopulation>>(`${API_URL}/population`, {
        ...options,
        params: {
          country_name: name,
        },
      })
      .pipe(map((response) => response.data.body));
  }
}
