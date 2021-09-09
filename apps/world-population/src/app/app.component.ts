import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from './api.service';
import { CountryPopulation, Pagination, CountriesParams } from '@xmind/model';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'xmind-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  searchControl = new FormControl();

  worldPopulation$ = this.apiService.worldPopulation$;
  searchValues$ = this.searchControl.valueChanges.pipe(
    switchMap((value) => this.apiService.getCountryNames({ q: value }))
  );
  top20Countries$ = this.apiService.getCountries();

  pageSubject = new BehaviorSubject<CountriesParams>({ limit: 10 });
  countriesWithDetails$ = this.pageSubject
    .asObservable()
    .pipe(switchMap((query) => this.apiService.getCountries(query)));

  constructor(private apiService: ApiService) {}

  loadPage(index: number) {
    this.pageSubject.next({ limit: 10, page: index });
  }
}
