import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { City } from './City';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Country } from '../countries/Country';
import { Observable, map } from 'rxjs';
import { BaseFormComponent } from '../base-form.component';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss'],
})
export class CityEditComponent extends BaseFormComponent implements OnInit {
  title?: string;

  city?: City;

  id?: number;

  countries!: Country[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cityService: CityService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        lat: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/),
        ]),
        lon: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/),
        ]),
        countryId: new FormControl('', Validators.required),
      },
      null,
      this.isDupeCity()
    );
    this.loadData();
  }

  isDupeCity(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      var city = <City>{};
      city.id = this.id ? this.id : 0;
      city.name = this.form.get('name')?.value;
      city.lat = this.form.get('lat')?.value;
      city.lon = this.form.get('lon')?.value;
      city.countryId = this.form.get('countryId')?.value;

      var url = environment.baseUrl + 'api/Cities/IsDupeCity';

      return this.cityService.isDupeCity(city).pipe(
        map((result) => {
          return result ? { isDupeCity: true } : null;
        })
      );
    };
  }

  loadData() {
    this.loadCountries();

    var idParam = this.activatedRoute.snapshot.paramMap.get('id');

    // checks if the idParam is truthy (not null, undefined, 0, false, or an empty string)
    // using the conditional operator "?"
    // if its truthy it converts it to a number using the  plus operator "+"
    // if its not truthy it assigns 0
    this.id = idParam ? +idParam : 0;

    if (this.id) {
      // edit mode
      var url = environment.baseUrl + 'api/Cities/' + this.id;

      this.cityService.get(this.id).subscribe(
        (result) => {
          this.city = result;
          this.title = 'Edit - ' + this.city.name;

          this.form.patchValue(this.city);
        },
        (error) => console.log(error)
      );
    } else {
      // add new mode
      this.title = 'Create a new City';
    }
  }

  loadCountries() {
    this.cityService.getCountries(0, 9999, 'name', 'asc', null, null).subscribe(
      (result) => {
        this.countries = result.data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    var city = this.id ? this.city : <City>{};

    if (city) {
      city.name = this.form.controls['name'].value;
      city.lat = +this.form.controls['lat'].value;
      city.lon = +this.form.controls['lon'].value;
      city.countryId = +this.form.controls['countryId'].value;

      if (this.id) {
        //edit mode

        this.cityService.put(city).subscribe(
          (result) => {
            console.log('City ' + city!.id + ' has been updated.');

            this.router.navigate(['/cities']);
          },
          (error) => console.log(error)
        );
      } else {
        // add new mode

        this.cityService.post(city).subscribe(
          (result) => {
            console.log('City' + result.id + ' has been created.');

            this.router.navigate(['/cities']);
          },
          (error) => console.log(error)
        );
      }
    }
  }
}
