import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Country } from './Country';
import { environment } from './../../environments/environment.prod';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CountryService } from '../services/country.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  private destroySubject = new Subject();
  isLoggedIn: boolean = false;

  public displayedColumns: string[] = [
    'id',
    'name',
    'iso2',
    'iso3',
    'totCities',
    'edit',
  ];
  public countries!: MatTableDataSource<Country>;

  defaultPageIndex = 0;
  defaultPageSize = 10;
  public defaultSortColumn: string = 'name';
  public defaultSortOrder: 'asc' | 'desc' = 'asc';
  defaultFilterColumn: string = 'name';
  filterQuery?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>();

  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe((query) => {
          this.loadData(query);
        });
    }
    this.filterTextChanged.next(filterText);
  }

  constructor(
    private countryService: CountryService,
    private auth: AuthService
  ) {
    this.isLoggedIn = this.auth.isAuthenticated();
    this.auth.authStatus
      .pipe(takeUntil(this.destroySubject))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
  }

  ngOnInit(): void {
    this.loadData();
    this.isLoggedIn = this.auth.isAuthenticated();
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  loadData(query?: string) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.filterQuery = query;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var sortColumn = this.sort ? this.sort.active : this.defaultSortColumn;
    var sortOrder = this.sort ? this.sort.direction : this.defaultSortOrder;
    var filterColumn = this.filterQuery ? this.defaultFilterColumn : null;
    var filterQuery = this.filterQuery ? this.filterQuery : null;
    this.countryService
      .getData(
        event.pageIndex,
        event.pageSize,
        sortColumn,
        sortOrder,
        filterColumn,
        filterQuery
      )
      .subscribe(
        (result) => {
          this.paginator.length = result.totalCount;
          this.paginator.pageIndex = result.pageIndex;
          this.paginator.pageSize = result.pageSize;
          this.countries = new MatTableDataSource<Country>(result.data);
        },
        (error) => console.error(error)
      );
  }
}
