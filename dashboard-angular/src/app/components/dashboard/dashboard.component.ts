import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardsComponent } from '../cards/cards.component';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { AreaChartComponent } from '../charts/area-chart/area-chart.component';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from '../charts/doughnut-chart/doughnut-chart.component';
import { PaginationTableComponent } from '../table/pagination-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    CardsComponent,
    AreaChartComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
    PaginationTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stats: any;

  constructor(private api: ApiService) {}

  async ngOnInit() {
    try {
      this.stats = await this.api.getStats();
    } catch (err) {
      console.error(err);
    }
  }
}
