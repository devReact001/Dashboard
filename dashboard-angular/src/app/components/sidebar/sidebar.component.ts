import { Component, OnInit } from '@angular/core';
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
export class SidebarComponent implements OnInit {
  user: any = null;
  notifications: any[] = [];
  currentDate = new Date();

  constructor(private api: ApiService, private router: Router) {}

  async ngOnInit() {
    try {
      // 👤 get user info
      this.user = await this.api.getSidebar();

      // 🔔 get notifications
      this.notifications = await this.api.getNotifications();
    } catch (error) {
      console.error('Sidebar Error:', error);
    }
  }

  // 🚪 logout
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}