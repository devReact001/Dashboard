import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  async login() {
    console.log('LOGIN CLICKED');

    const res = await fetch('https://dashboard-ni4q.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Login failed');
      return;
    }

    localStorage.setItem('token', data.token);

    // ✅ Angular navigation
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }
}
