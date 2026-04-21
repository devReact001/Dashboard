import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  template: `<canvas id="barChart"></canvas>`,
})
export class BarChartComponent implements AfterViewInit {
  constructor(private api: ApiService) {}

  async ngAfterViewInit() {
  const data = await this.api.getBarChart();

  new Chart('barChart', {
    type: 'bar',
    data: {
      labels: data.map((d: any) => d.quarter),
      datasets: [
        { label: 'iPhone',     data: data.map((d: any) => d.iphone),     backgroundColor: '#3b82f6', borderRadius: 4 },
        { label: 'Mac',        data: data.map((d: any) => d.mac),        backgroundColor: '#a78bfa', borderRadius: 4 },
        { label: 'iPad',       data: data.map((d: any) => d.ipad),       backgroundColor: '#34d399', borderRadius: 4 },
        { label: 'Wearables',  data: data.map((d: any) => d.wearables),  backgroundColor: '#fb923c', borderRadius: 4 },
        { label: 'Services',   data: data.map((d: any) => d.services),   backgroundColor: '#f87171', borderRadius: 4 },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#e2e8f0' } } },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
      },
    },
  });
}
}