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
export interface CountryNamesParams {
  limit?: number;
  page?: number;
  q?: string;
}
export interface CountriesParams {
  limit?: number;
  page?: number;
}
export interface Pagination<T> {
  current_page: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  total: number;
  items: T[];
}
