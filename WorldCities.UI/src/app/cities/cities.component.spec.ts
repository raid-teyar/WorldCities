import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitiesComponent } from './cities.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '../angular-material.module';
import { of } from 'rxjs';
import { CityService } from '../services/city.service';
import { ApiResult } from '../services/base.service';
import { City } from './City';

describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;

  beforeEach(async () => {
    // in this section we create or declare our dependencies / services / providers...
    // Create a mock cityService object with a mock 'getData' method
    let cityService = jasmine.createSpyObj<CityService>('CityService', [
      'getData',
    ]);
    // Configure the 'getData' spy method
    cityService.getData.and.returnValue(
      // return an Observable with some test data
      of<ApiResult<City>>(<ApiResult<City>>{
        data: [
          <City>{
            name: 'TestCity1',
            id: 1,
            lat: 1,
            lon: 1,
            countryId: 1,
            countryName: 'TestCountry1',
          },
          <City>{
            name: 'TestCity2',
            id: 2,
            lat: 1,
            lon: 1,
            countryId: 1,
            countryName: 'TestCountry1',
          },
          <City>{
            name: 'TestCity3',
            id: 3,
            lat: 1,
            lon: 1,
            countryId: 1,
            countryName: 'TestCountry1',
          },
        ],
        totalCount: 3,
        pageIndex: 0,
        pageSize: 10,
      })
    );

    await TestBed.configureTestingModule({
      declarations: [CitiesComponent],
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        RouterTestingModule,
      ],
      providers: [
        // here we reference the declared mock object / service / provider...
        { provide: CityService, useValue: cityService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;

    // here we can configure the components before the first change detection cycle runs

    component.paginator = jasmine.createSpyObj('MatPaginator', [
      'length',
      'pageIndex',
      'pageSize',
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a "Cities" title', () => {
    let title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toEqual('Cities');
  });

  it('should contain a table with a list of one or more cities', () => {
    let table = fixture.nativeElement.querySelector('table.mat-table');
    let tableRows = table.querySelectorAll('tr.mat-row');
    expect(tableRows.length).toBeGreaterThan(10);
  });
});
