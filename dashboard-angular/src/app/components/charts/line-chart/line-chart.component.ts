import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `<div style="position:relative;width:100%;height:100%;"><canvas id="lineChart"></canvas></div>`,
})
export class LineChartComponent implements AfterViewInit {
  constructor(private api: ApiService) {}

  async ngAfterViewInit() {
    const office = await this.api.getSensor('office');
    const lounge = await this.api.getSensor('lounge');

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: office.map((d: any) => new Date(d.time).toLocaleTimeString()),
        datasets: [
          {
            label: 'Office',
            data: office.map((d: any) => d.sensor),
            borderColor: '#3b82f6',
            tension: 0.4,
            pointRadius: 3,
          },
          {
            label: 'Lounge',
            data: lounge.map((d: any) => d.sensor),
            borderColor: '#a78bfa',
            tension: 0.4,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#e2e8f0' } } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
        },
      },
    });
  }
}