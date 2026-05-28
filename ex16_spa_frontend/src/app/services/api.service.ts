import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const url = '/api/auth/signin';
const urlBooks = '/api/books';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  auth(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.post(url, {username, password}, {
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }

  getBooks() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    });
    return this.http.get(urlBooks, {
      headers,
      observe: 'response',
      responseType: 'json'
    });
  }

}
