import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getData(): Observable<[]> {
    return this.httpClient.get<[]>(`https://api.publicapis.org/categories`);
  }



}
