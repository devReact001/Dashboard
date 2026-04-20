import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: any = null;
  notifications: any[] = [];
  currentDate = new Date();
  private timer: any;

  constructor(private api: ApiService, private router: Router) {}

  async ngOnInit() {
    // Live clock
    this.timer = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);

    try {
      const userRes = await this.api.getSidebar();
      this.user = Array.isArray(userRes) ? userRes[0] : userRes;
      this.notifications = await this.api.getNotifications();
    } catch (error) {
      console.error('Sidebar Error:', error);
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}