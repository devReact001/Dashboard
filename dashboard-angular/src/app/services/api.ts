import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface PaginatedResponse {
  data: any[];
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://dashboard-ni4q.onrender.com/api';

  constructor(private http: HttpClient) {}

  // ✅ headers (array)
  getHeaders(): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/candidates/headers`)
    );
  }

  // ✅ paginated response
  getCandidates(page = 1, limit = 5): Promise<PaginatedResponse> {
    return firstValueFrom(
      this.http.get<PaginatedResponse>(
        `${this.baseUrl}/candidates?page=${page}&limit=${limit}`
      )
    );
  }

  // ✅ stats (object)
  getStats(): Promise<any> {
    return firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/dashboard/stats`)
    );
  }

  // ✅ sidebar (array)
  getSidebar(): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/sidebar`)
    );
  }

  // ✅ notifications (array)
  getNotifications(): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/sidebar/notifications`)
    );
  }

  // ✅ charts (arrays)
  getAreaChart(): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/charts/area`)
    );
  }

  getBarChart(): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/charts/bar`)
    );
  }

  getPieChart(): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/charts/simple/pie`)
    );
  }

  getDoughnutChart(): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/charts/simple/doughnut`)
    );
  }

  // ✅ sensor (array)
  getSensor(location: string): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/sensor/${location}`)
    );
  }
}