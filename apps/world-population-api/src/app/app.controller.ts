import { Controller, Get, Query } from '@nestjs/common';
import { CountriesParams, CountryNamesParams } from '@xmind/model';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('world-population')
  getWorldPopulation() {
    return this.appService.getWorldPopulation();
  }

  @Get('country-names')
  getCountryNames(@Query() query: CountryNamesParams) {
    return this.appService.getCountryNames(query);
  }

  @Get('countries')
  getCountries(@Query() query: CountriesParams) {
    return this.appService.getCountries(query);
  }

  @Get('country')
  getCountryByName(@Query('name') name: string) {
    return this.appService.getCountryByName(name);
  }
}
