import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type.interface';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{


  public countries: Country[] = [];
  public regions: Region[] = ['America', 'Africa', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region ;
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService){ }

  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }

  searchByRegion(region: Region): void {

    this.isLoading = true;
    this.selectedRegion = region;

    this.countriesService.searchRegion(region)
    .subscribe( countries => {
      this.countries = countries
      this.isLoading = false;

    })
  }
}
