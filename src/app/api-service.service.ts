import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  HttpClient;
  constructor(public http: HttpClient) { }

  getCurrentIp() {
    return this.http.get( 'https://jsonip.com', {});
  }

  getIPdetails(ip){
    return this.http.get( 'https://api.ipgeolocation.io/ipgeo/?apiKey=e791081f2c9d4f11a67c4a0cae9a531b&ip=' + ip, {});
  }

}
