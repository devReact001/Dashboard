import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://dashboard-ni4q.onrender.com/api';

  getHeaders() {
    return this.fetch('/candidates/headers');
  }

  getCandidates(page = 1, limit = 5) {
    return this.fetch(`/candidates?page=${page}&limit=${limit}`);
  }

  getStats() {
    return this.fetch('/dashboard/stats');
  }

  getSidebar() {
    return this.fetch('/sidebar');
  }

  getNotifications() {
    return this.fetch('/sidebar/notifications');
  }

  getAreaChart() {
    return this.fetch('/charts/area');
  }

  getBarChart() {
    return this.fetch('/charts/bar');
  }

  getDoughnutChart() {
    return this.fetch('/charts/doughnut');
  }

  getPieChart() {
    return this.fetch('/charts/pie');
  }

  getSensor(location: string) {
    return this.fetch(`/sensor/${location}`);
  }

  // 🔥 common fetch
  async fetch(path: string) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data;

    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid JSON response');
    }

    if (!res.ok) {
      throw new Error(data.message || 'API failed');
    }

    return data;
  }
}
