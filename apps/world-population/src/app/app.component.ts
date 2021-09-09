import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService, CountryPopulation, Pagination } from './api.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'xmind-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  subscription = new Subscription();

  searchControl = new FormControl();

  worldPopulation$ = this.apiService.worldPopulation$;
  allCountries: string[] = [];

  searchValues$ = this.searchControl.valueChanges.pipe(
    map((value) =>
      this.allCountries
        ?.filter((con) => con.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 15)
    )
  );

  private countriesWithDetailsSubject = new BehaviorSubject<
    Pagination<CountryPopulation>
  >({
    current_page: 1,
    has_next_page: true,
    has_previous_page: false,
    items: [],
  });
  countriesWithDetails$ = this.countriesWithDetailsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.subscription.add(
      this.apiService.allCountries$.subscribe((allCountries) => {
        this.allCountries = allCountries;
        this.loadPage(1);
      })
    );
  }
  loadPage(index: number) {
    const specificPages = this.allCountries.slice((index - 1) * 10, index * 10);
    this.subscription.add(
      forkJoin(
        specificPages.map((name) =>
          this.apiService.getCountryPopulationByName(name)
        )
      ).subscribe((countries) => {
        this.countriesWithDetailsSubject.next({
          current_page: index,
          has_next_page: index < this.allCountries.length / 10,
          has_previous_page: index > 1,
          items: countries,
        });
      })
    );
  }
}
