import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  template: `<canvas id="areaChart"></canvas>`,
})
export class AreaChartComponent implements AfterViewInit {
  constructor(private api: ApiService) {}

  async ngAfterViewInit() {
    try {
      const data = await this.api.getAreaChart();
      new Chart('areaChart', {
        type: 'line',
        data: {
          labels: data.map((d: any) => d.label),
          datasets: [{
            label: 'Area',
            data: data.map((d: any) => d.value),
            fill: true,
            backgroundColor: 'rgba(59,130,246,0.15)',
            borderColor: '#3b82f6',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#3b82f6',
          }],
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
    } catch (err) {
      console.error('Area chart error:', err);
    }
  }
}