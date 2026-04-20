import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://dashboard-ni4q.onrender.com/api';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/candidates/headers`)
    );
  }

  getCandidates(page = 1, limit = 5) {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/candidates?page=${page}&limit=${limit}`)
    );
  }

  getStats() {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/dashboard/stats`)
    );
  }

  getSidebar() {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/sidebar`)
    );
  }

  getNotifications() {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/sidebar/notifications`)
    );
  }

  getAreaChart() {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/charts/area`)
    );
  }

  getBarChart() {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/charts/bar`)
    );
  }

  getDoughnutChart() {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/charts/simple/doughnut`)
    );
  }

  getPieChart() {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/charts/simple/pie`)
    );
  }

  getSensor(location: string) {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/sensor/${location}`)
    );
  }
}