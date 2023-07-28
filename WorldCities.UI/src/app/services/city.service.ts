import { Injectable, Input } from '@angular/core';
import { City } from '../cities/City';
import { ApiResult, BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Country } from '../countries/Country';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CityService extends BaseService<City> {
  constructor(http: HttpClient, private apollo: Apollo) {
    super(http);
  }

  override getData(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null
  ): Observable<ApiResult<City>> {
    return this.apollo
      .query({
        query: gql`
          query GetCitiesApiResult(
            $pageIndex: Int!
            $pageSize: Int!
            $sortColumn: String
            $sortOrder: String
            $filterColumn: String
            $filterQuery: String
          ) {
            citiesApiResult(
              pageIndex: $pageIndex
              pageSize: $pageSize
              sortColumn: $sortColumn
              sortOrder: $sortOrder
              filterColumn: $filterColumn
              filterQuery: $filterQuery
            ) {
              data {
                id
                name
                lat
                lon
                countryId
                countryName
              }
              pageIndex
              pageSize
              totalCount
              totalPages
              sortColumn
              sortOrder
              filterColumn
              filterQuery
            }
          }
        `,
        variables: {
          pageIndex,
          pageSize,
          sortColumn,
          sortOrder,
          filterColumn,
          filterQuery,
        },
      })
      .pipe(map((result: any) => result.data.citiesApiResult));
  }
  override get(id: number): Observable<City> {
    return this.apollo
      .query({
        query: gql`
          query GetCityById($id: Int!) {
            cities(where: { id: { eq: $id } }) {
              nodes {
                id
                name
                lat
                lon
                countryId
              }
            }
          }
        `,
        variables: { id },
      })
      .pipe(map((result: any) => result.data.cities.nodes[0]));
  }
  override put(city: City): Observable<City> {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation UpdateCity($city: CityDTOInput!) {
          updateCity(cityDTO: $city) { 
            id
            name
            lat
            lon
            countryId
          }
         `,
        variables: {
          city,
        },
      })
      .pipe(map((result: any) => result.data.updateCity));
  }

  override post(city: City): Observable<City> {
    city.id = 0;
    return this.apollo
      .mutate({
        mutation: gql`
          mutation AddCity($city: CityDTOInput!) {
            addCity(cityDTO: $city) {
              id
              name
              lat
              lon
              countryId
            }
          }
        `,
        variables: {
          city,
        },
      })
      .pipe(map((result: any) => result.data.addCity));
  }

  getCountries(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null
  ): Observable<ApiResult<Country>> {
    var url = this.getUrl('api/Countries');
    var params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortOrder', sortOrder);
    if (filterColumn && filterQuery) {
      params = params
        .set('filterColumn', filterColumn)
        .set('filterQuery', filterQuery);
    }
    return this.http.get<ApiResult<Country>>(url, { params });
  }

  isDupeCity(item: City): Observable<boolean> {
    var url = this.getUrl('api/Cities/isDupeCity');
    return this.http.post<boolean>(url, item);
  }
}
